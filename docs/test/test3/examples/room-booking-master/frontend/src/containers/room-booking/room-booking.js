import React from "react";
import moment from "moment";

import {
    RoomBookingDiagramWrapper,
    RoomBookingTimeLineWrapper,
    RoomBookingDiagramContent
} from "./room-booking-styled";
import {BookingDate} from "../../components/booking-date";
import {TimeLine} from "../../components/time-line";
import {RoomList} from "../../components/room-list";
import {
    ONE_MINUTE_WIDTH,
    ONE_HOUR_WIDTH,
    START_HOUR,
    END_HOUR,
    TIME_FORMAT
} from "../../constants";
import {
    NewEventService,
    EventService,
    RoomService
} from "../../services";
import {Column} from "../../common-style";
import throttle from "lodash.throttle";

export class RoomBooking extends React.PureComponent {

    constructor(props) {
        super(props);

        this.hoursLength = END_HOUR - START_HOUR + 1;
        this.eightHours = 60 * 8;
        this.hours = Array.apply(null, {length: this.hoursLength}).map((e, i) => i + START_HOUR);

        this.state = {
            rooms: null,
            eventsByRoom: null,
            freeEventsByRoom: null,
            isCalendarOpened: false,
            time: moment().format(TIME_FORMAT),
            /**
             * room-lines state
             */
            activeRoomLine: {
                id: null,
                left: null,
                width: null
            },
            newEvent: {
                offset: null,
                isAvailable: null,
                duration: null
            }
        };

        this.mapEventsToState = this.mapEventsToState.bind(this);
        this.mapRoomsToState = this.mapRoomsToState.bind(this);
        this.calculateTickerOffset = this.calculateTickerOffset.bind(this);
        this.tick = this.tick.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.calcNewEventOffset = this.calcNewEventOffset.bind(this);
        this.throttledCalcNewEventOffset = throttle(this.calcNewEventOffset.bind(this), 1000/60);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.interval = setInterval(this.tick, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        const {rooms, events} = nextProps;

        if (rooms && events) {
            this.setState({
                rooms: this.mapRoomsToState(rooms),
                eventsByRoom: this.mapEventsToState(events),
                freeEventsByRoom: null
            });
        }
    }

    componentDidUpdate() {
        const {eventsByRoom, freeEventsByRoom} = this.state;

        if (eventsByRoom && !freeEventsByRoom) {
            this.setState({
                freeEventsByRoom: this.mapFreeEventsToState(eventsByRoom)
            });
        }
    }

    mapFreeEventsToState(eventsByRoom) {
        const {date, rooms} = this.props;

        return EventService.groupFreeEventsByRoom(eventsByRoom, rooms, date);
    }

    mapEventsToState(events) {
        let start, end, duration, offset, newEvent, roomId;

        return EventService
            .sortEventsByDate(events)
            .reduce((eventList, event) => {
                start = moment(event.dateStart);
                end = moment(event.dateEnd);
                duration = moment.duration(end.diff(start)).asMinutes();
                offset = start.hours() * 60 + start.minutes();
                roomId = event.room.id;
                newEvent = {
                    ...event,
                    width: Math.abs(duration * ONE_MINUTE_WIDTH),
                    offset: Math.abs((offset - this.eightHours) * ONE_MINUTE_WIDTH)
                };

                if (eventList[roomId]) {
                    eventList[roomId].push(newEvent);
                }
                else {
                    eventList[roomId] = [newEvent];
                }

                return eventList;
            }, {});
    }

    mapRoomsToState(rooms) {
        return RoomService.groupRoomsByFloor(rooms);
    }

    calculateTickerOffset() {
        const {time} = this.state;
        const hours = time.split(":")[0] - 8;
        const minutes = time.split(":")[1];
        const hoursWidth = hours * ONE_HOUR_WIDTH;
        const minutesWidth = minutes * ONE_MINUTE_WIDTH;

        return hoursWidth + minutesWidth;
    }

    tick() {
        this.setState({time: moment().format(TIME_FORMAT)});
    }

    toggleCalendar() {
        this.setState({isCalendarOpened: !this.state.isCalendarOpened});
    }

    calcNewEventOffset(e) {
        const {date} = this.props;
        const {freeEventsByRoom, activeRoomLine} = this.state;
        const newState = NewEventService.calcNewEventOffset(e, freeEventsByRoom, date, activeRoomLine);

        return newState ? this.setState(newState) : newState;
    }

    onMouseMove(e){
        e.persist();
        this.throttledCalcNewEventOffset(e);
    }

    render() {
        const {date, onDateChange} = this.props;
        const {time, rooms, eventsByRoom, freeEventsByRoom, isCalendarOpened, newEvent, activeRoomLine} = this.state;
        const offset = this.calculateTickerOffset();

        return (
            <Column>
                <RoomBookingTimeLineWrapper>
                    <BookingDate
                        date={date}
                        changeDate={onDateChange}
                        toggleCalendar={this.toggleCalendar}
                        isCalendarOpened={isCalendarOpened}
                    />
                    <TimeLine
                        hours={this.hours}
                        tickerTime={time}
                        tickerOffset={offset}
                    />
                </RoomBookingTimeLineWrapper>
                <RoomBookingDiagramWrapper>
                    <RoomBookingDiagramContent
                        onMouseMove={this.onMouseMove}
                    >
                        <RoomList
                            rooms={rooms}
                            eventsByRoom={eventsByRoom}
                            freeEventsByRoom={freeEventsByRoom}
                            newEvent={newEvent}
                            activeRoomLine={activeRoomLine}
                        />
                    </RoomBookingDiagramContent>
                </RoomBookingDiagramWrapper>
            </Column>
        );
    }
}
