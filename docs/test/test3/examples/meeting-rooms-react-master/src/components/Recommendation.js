import React from 'react';
import { withApollo } from 'react-apollo';
import { ROOMS_QUERY, USERS_QUERY, EVENTS_QUERY } from '../queries';
import getRecommendation from '../utils/getRecommendation';

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomsLoading: true,
            usersLoading: true,
            eventsLoading: true,
            rooms: [],
            users: [],
            events: [],
            selectedRoom: ''
        }
    }

    componentWillMount() {
        const client = this.props.client;
        client.query({
            query: ROOMS_QUERY,
        }).then( (data) => {
            this.setState({
                roomsLoading: false,
                rooms: data.data.rooms
            });
        });
        client.query({
            query: USERS_QUERY
        }).then( (data) => {
            this.setState({
                usersLoading: false,
                users: data.data.users
            });
        });
        client.query({
            query:  EVENTS_QUERY
        }).then( (data) => {
            this.setState({
                eventsLoading: false,
                events: data.data.events
            });
        });
    }

    _onClick = (room) => {
        this.setState({
            selectedRoom: room.id
        });
        if (this.props.onClick) {
            this.props.onClick(room);
        }
    }

    render(){
        if (this.state.roomsLoading || this.state.usersLoading || this.state.eventsLoading) {
            return null;
        }

        if (this.props.date && this.props.dateValid && this.props.timeValid && this.props.startTime && this.props.endTime && this.props.users.length > 1) {
            const createEvent = {
                date: this.props.date,
                startTime: this.props.startTime,
                endTime: this.props.endTime,
                users:this.props.users
            }
            let rooms = this.state.rooms;
            let users = this.state.users;
            let events = this.state.events;
            let recommendations = getRecommendation(rooms, users, events, createEvent);

            if (recommendations.result.length === 0) {
                return <div className="grey">{recommendations.title}</div>
            }

            return (
                recommendations && recommendations.result.map((room) => {
                    let isActive = (room.id === this.state.selectedRoom);
                    const classActive = (isActive) ? " input__field_meeting" : " input__field_recommendation";

                    return (<div className={"input__field" + classActive}
                        key={room.id} onClick={() => this._onClick(room)} >
                        <span className="meeting-time">{createEvent.startTime} - {createEvent.endTime}</span>
                        <span>{room.title} · {room.floor}</span>
                    </div>)
                })
            )
        }

        return (
            <div className="grey">Заполните поля даты, времени и участников</div>
        )
    }
};

export default withApollo(Recommendation);
