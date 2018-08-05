import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

import {
    CALENDAR_DATE_FORMAT,
    INPUT_DATE_FORMAT,
    TIME_FORMAT
} from "../../constants";
import {
    EditFormWrapper,
    EditFormContent,
    FormColumn,
    EditFormTitleWrapper,
    Form,
    FormInputWrapper,
    Divider
} from "./edit-form-styled";
import {Icon} from "../../components/icon";
import {Input} from "../../components/input";
import {AutocompleteChipsContainer} from "../autocomplete-chips-container";
import {SelectionListContainer} from "../selection-list";
import {Button} from "../../components/button";
import {Footer} from "../../components/footer";
import {Column, Row} from "../../common-style";
import {DialogBox} from "../../components/dialog-box";
import forbid from "../../assets/images/emoji1.svg";
import success from "../../assets/images/emoji2.svg";
import {EventService} from "../../services/EventService";
import {RoomService} from "../../services/RoomService";

const empty = [];

export class EditForm extends React.Component {

    constructor(props) {
        super(props);

        this.eventId = props.match.params.id;
        this.hasEventCreated = !!this.eventId;
        this.options = props.location.state;

        this.state = {
            id: null,
            title: "",
            usersIds: [],
            date: "",
            startTime: "",
            endTime: "",
            roomId: null,
            isRemoved: false,
            isUpdated: false,
            isCreated: false,
            freeEventsByRoom: null,
            freeRooms: []
        };

        if (this.options) {
            const {event} = this.options;

            if (props.date !== event.date) {
                props.onDateChange(moment(event.date));
            }
            for (let key in event) this.state[key] = event[key];
        }

        this.isEventValid = this.isEventValid.bind(this);
        this.searchFreeRooms = this.searchFreeRooms.bind(this);
        this.onRoomClick = this.onRoomClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onUserListChange = this.onUserListChange.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.shouldEventRemove = this.shouldEventRemove.bind(this);

        if (!this.hasEventCreated) {
            this.title = "Новая встреча";
            this.footerContent = <Button primary onClick={this.saveEvent}>Создать встречу</Button>;
        }
        else {
            this.title = "Редактирование встречи";
            this.footerContent = (
                <Row>
                    <Button default onClick={this.shouldEventRemove}>Удалить встречу</Button>
                    <Button default data-event-id={this.eventId} onClick={this.saveEvent}>Сохранить</Button>
                </Row>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        const {event, eventList, roomList, date, onDateChange} = nextProps;
        const hasEventData = this.state.id;
        const eventListInit = eventList || this.props.eventList;
        const roomListInit = roomList || this.props.roomList;
        const eventInit = event || this.props.event;
        const {
            groupFreeEventsByRoom,
            groupEventsByRoom,
            sortEventsByDate
        } = EventService;

        if (eventListInit && roomListInit) {
            let addToState;
            const start = eventInit ? moment(eventInit.dateStart) : null;
            const end = eventInit ? moment(eventInit.dateEnd) : null;

            if (this.hasEventCreated && eventInit && !hasEventData) {
                if (start.format() !== date) onDateChange(start);

                addToState = {
                    id: eventInit.id,
                    title: eventInit.title,
                    usersIds: eventInit.users.map(user => user.id),
                    date: start.format(INPUT_DATE_FORMAT),
                    startTime: start.format(TIME_FORMAT),
                    endTime: end.format(TIME_FORMAT),
                    roomId: eventInit.room.id
                };
            }
            else {
                const {startTime, endTime, date} = this.state;

                addToState = {startTime, endTime, date};
            }

            const freeEventsByRoom = groupFreeEventsByRoom(
                groupEventsByRoom(sortEventsByDate(eventListInit)),
                roomListInit,
                date
            );
            const freeRooms = this.searchFreeRooms(freeEventsByRoom, addToState);

            if (eventInit && start.format(INPUT_DATE_FORMAT) === addToState.date) {
                freeRooms.push({
                    ...roomListInit.find(room => room.id === eventInit.room.id),
                    time: [start.format(), end.format()]
                });
            }

            const newState = {
                ...addToState,
                freeEventsByRoom,
                freeRooms
            };

            this.setState(newState);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {startTime, endTime, date, freeEventsByRoom, roomId} = this.state;
        const {event, roomList} = this.props;
        const newDate = moment(date);

        if (this.hasEventCreated && !prevProps.event) return;
        if (date !== prevState.date) {
            const newState = {roomId: null};

            if (newDate.isValid()) {
                this.props.onDateChange(newDate);
            }
            else {
                newState.freeRooms = null;
            }

            return this.setState(newState);
        }
        if (startTime !== prevState.startTime || endTime !== prevState.endTime) {
            const newState = {
                roomId: prevState.roomId ? null : roomId,
                freeRooms: this.searchFreeRooms(freeEventsByRoom, this.state)
            };

            if (event) {
                const start = moment(event.dateStart);
                const end = moment(event.dateEnd);

                if (start.format(INPUT_DATE_FORMAT) === date) {
                    newState.freeRooms.push({
                        ...roomList.find(room => room.id === event.room.id),
                        time: [start.format(), end.format()]
                    });
                }
            }

            return this.setState(newState);
        }
    }

    saveEvent(e) {
        const id = e.target.dataset.eventId;
        const {roomId, title, date, startTime, endTime, usersIds} = this.state;
        const day = moment(date, INPUT_DATE_FORMAT, true);
        const start = moment(startTime, TIME_FORMAT, true);
        const end = moment(endTime, TIME_FORMAT, true);
        const {createEvent, updateEvent, event} = this.props;
        const data = {
            usersIds,
            roomId,
            input: {
                title,
                dateStart: day.set({hour: start.hour(), minute: start.minute()}).format(),
                dateEnd: day.set({hour: end.hour(), minute: end.minute()}).format()
            },
        };

        console.log("SAVE WITH DATA", id, data);

        if (this.isEventValid()) {
            if (id) {
                const lastDate = event.dateStart;

                return updateEvent({id, ...data, lastDate})
                    .then(res => this.setState({isUpdated: true}))
                    .catch(err => console.error(err));
            }

            return createEvent(data)
                .then(res => this.setState({isCreated: true}))
                .catch(err => console.error(err));
        }

        console.warn("[EditPage.saveEvent]: Event is not valid!", data);

        return null;
    }

    shouldEventRemove() {
        this.setState((prevState) => ({isRemoved: !prevState.isRemoved}));
    }

    removeEvent(e) {
        const id = e.target.dataset.eventId;
        const {removeEvent} = this.props;

        console.log("REMOVE", id);

        return removeEvent(id)
            .catch(err => console.error(err));
    }

    searchFreeRooms(freeEventsByRoom, {startTime, endTime, date}) {
        const {roomList} = this.props;
        const duration = {startTime, endTime, date};

        return RoomService.searchFreeRooms(freeEventsByRoom, roomList, duration);
    }

    onRoomClick(room) {
        if (!room) return this.setState({roomId: null});

        const {time, id} = room;

        this.setState({
            roomId: id,
            startTime: moment(time[0]).format(TIME_FORMAT),
            endTime: moment(time[1]).format(TIME_FORMAT)
        });
    }

    onInputChange(e) {
        const {value, dataset} = e.target;
        const {flag} = dataset;

        this.setState({[flag]: value});
    }

    onUserListChange(newUserIdsList) {
        this.setState({usersIds: newUserIdsList});
    }

    isEventValid() {
        const {roomId, title} = this.state;

        return !(roomId === null || !title.length);
    }

    render() {
        const {userList} = this.props;
        const {
            title, date, startTime, endTime,
            roomId, usersIds, freeRooms,
            isRemoved, isCreated, isUpdated
        } = this.state;

        return (
            <Column>
                <EditFormWrapper>
                    <EditFormContent>
                        <EditFormTitleWrapper>
                            <span>{this.title}</span>
                            <Link to="/">
                                <Icon background type="close"/>
                            </Link>
                        </EditFormTitleWrapper>
                        <Form>
                            <FormColumn>
                                <Input label="Тема"
                                       placeholder="О чем будете говорить?"
                                       value={title}
                                       flag="title"
                                       onChange={this.onInputChange}
                                />
                                <AutocompleteChipsContainer
                                    titleKey="login"
                                    subtitleKey="homeFloor"
                                    avatarKey="avatarUrl"
                                    placeholder="Например, Тор Одинович"
                                    label="Участники"
                                    selectedItems={usersIds}
                                    onPropChange={this.onUserListChange}
                                    items={userList || empty}
                                />
                            </FormColumn>
                            <FormColumn>
                                <FormInputWrapper>
                                    <FormInputWrapper basis="45">
                                        <Input
                                            type="date"
                                            label="Дата"
                                            grow="3"
                                            value={date}
                                            flag="date"
                                            onChange={this.onInputChange}
                                        />
                                    </FormInputWrapper>
                                    <FormInputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Начало" grow="2"
                                            value={startTime}
                                            flag="startTime"
                                            onChange={this.onInputChange}
                                        />
                                    </FormInputWrapper>
                                    <FormInputWrapper>
                                        <Divider>—</Divider>
                                    </FormInputWrapper>
                                    <FormInputWrapper basis="23">
                                        <Input
                                            type="time"
                                            label="Конец"
                                            value={endTime}
                                            flag="endTime"
                                            onChange={this.onInputChange}
                                        />
                                    </FormInputWrapper>
                                </FormInputWrapper>
                                <SelectionListContainer
                                    onRoomChange={this.onRoomClick}
                                    items={freeRooms}
                                    selectedItem={{roomId, startTime}}
                                />
                            </FormColumn>
                        </Form>
                    </EditFormContent>
                </EditFormWrapper>
                <Footer>
                    <Link to="/">
                        <Button default>Отмена</Button>
                    </Link>
                    {this.footerContent}
                </Footer>
                {
                    isRemoved
                        ? <DialogBox
                            title="Вы действительно хотите удалить встречу?"
                            subtitle={title}
                            text={`${moment(date).format(CALENDAR_DATE_FORMAT)}, ${startTime}`}
                            isDialog
                            img={forbid}
                            eventId={this.eventId}
                            onSubmitClick={this.removeEvent}
                            onCancelClick={this.shouldEventRemove}
                        />
                        : null
                }
                {
                    isCreated
                        ? <DialogBox
                            title="Встреча была успешно создана!"
                            subtitle={title}
                            text={`${moment(date).format(CALENDAR_DATE_FORMAT)}, ${startTime}`}
                            img={success}
                        />
                        : null
                }
                {
                    isUpdated
                        ? <DialogBox
                            title="Встреча была изменена!"
                            subtitle={title}
                            text={`${moment(date).format(CALENDAR_DATE_FORMAT)}, ${startTime}`}
                            img={success}
                        />
                        : null
                }
            </Column>
        )
    }
}
