import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import moment from 'moment';

import Button from '../blocks/Button';

import { GET_EVENT_QUERY } from '../queries';

class Tooltip extends Component {

    render() {
        if (this.props.selectedEvent.loading) {
            return null;
        }

        const event = this.props.selectedEvent.event;
        const title = event.title;
        const data =  moment(Date.parse(event.dateStart)).format("DD MMMM","RU");
        const dateStart  = moment(Date.parse(event.dateStart)).format("HH:mm");
        const dateEnd = moment(Date.parse(event.dateEnd)).format("HH:mm");
        const room = event.room.title;
        const usersLength = event.users.length || "";
        let userFirst, usersOther;

        if (usersLength) {
            userFirst = event.users[0];
            usersOther = (usersLength > 1) ? usersLength-1 : "";
        };

        return (
            <div className="tooltip" style={this.props.toolStyle}>
                <div className="tooltip__logo">
                    <Link to={"/edit/" + event.id}>
                        <Button
                            type="circle"
                            name="edit"
                        />
                    </Link>
                </div>
                <div className="h2">{title}</div>
                <span>{data}, {dateStart} - {dateEnd}, · {room}</span>
                { usersLength &&
                    <div className="tooltip__members">
                        <div className="user-avatar"
                            style={{backgroundImage: userFirst.avatarUrl ?
                            `url(${userFirst.avatarUrl})` :
                            'url(../static/images/avatar/1.png'}}
                        />
                    <span className="user-name">{userFirst.login}</span>
                    { usersOther &&
                        <span className="grey">и {usersOther}</span>
                    }
                    </div>
                }
            </div>
        )
    }
}

export default graphql(GET_EVENT_QUERY, {
    options: ({eventId}) => ({ variables: {id : eventId} }),
    name: 'selectedEvent'
})(Tooltip);

