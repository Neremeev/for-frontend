import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';

import { CREATE_EVENT_MUTATION, GET_EVENTS_QUERY } from '../queries';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true
        };
    }

    componentWillReceiveProps(props){
        let eventData = (props.title && props.date && props.startTime && props.endTime
                        && props.users.length && props.room && props.formValid);
        this.setState({
            isDisabled: !eventData
        })
    }

    _onClick = () => {
        const {title, date, startTime, endTime, users, room} = this.props;
        let dateStart = moment(date, 'DD.MM.YYYY').set({"hours": startTime.slice(0, 2), "minutes": startTime.slice(3, 5)}).format();
        let dateEnd = moment(date, 'DD.MM.YYYY').set({"hours": endTime.slice(0, 2), "minutes": endTime.slice(3, 5)}).format();

        this.props.createEvent({
            variables: {
                eventInput: {
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    title: title
                },
                usersIds: users.map(user => user.id),
                roomId: room.id
            },
            refetchQueries: [{
            query:GET_EVENTS_QUERY
            }]
        })
        .then(({ data: {createEvent} }) => {
            this.props.history.push({
                pathname: '/',
                state: createEvent
            })
        })
    };

    render() {
        let isDisabled = this.state.isDisabled;
        const classDisabled = (isDisabled) ? " disabled" : " ";

        return (
            <Link to="/">
                <button className={"button" + classDisabled}  disabled={isDisabled} onClick={this._onClick}>
                    Создать встречу
                </button>
            </Link>
        )
    };
}

export default compose(
    graphql(CREATE_EVENT_MUTATION, {name: 'createEvent'})
)(withRouter(CreateEvent))
