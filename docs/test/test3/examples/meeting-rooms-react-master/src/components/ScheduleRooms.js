import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { groupBy, map } from 'lodash';

import RoomEvents from './RoomEvents';

class Room extends Component {

    render() {
        const { title, capacity, eventsGroup, room } = this.props;

        return (
            <div className={"room"}>
                <div className="room__data">
                    <div className="room__title">{title}</div>
                    <span>{capacity + ' человек'}</span>
                </div>
                <RoomEvents eventsData={eventsGroup} room={room} />
            </div>
        )
    }
}

const ScheduleRooms = ({ data: { loading, error, rooms, events } }) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    const floorsGroup = groupBy(rooms, "floor");
    const eventsGroup = groupBy(events, "room.id");

    return (
        <div className="schedule__rooms">
            {
                map(floorsGroup, (rooms, floorNumber) => (
                    <div key={floorNumber}>
                        <div className={"floor"}>{floorNumber + ' этаж'}</div>
                        {rooms.map(({ id, title, capacity }) => (
                            <Room key={id} title={title} capacity={capacity}
                                eventsGroup={eventsGroup[id]}
                                room={{id, title, floorNumber, capacity}} />
                        ))}
                    </div>
                ))}
        </div>
    )
};

const RoomsEventsQuery = gql`
  query Query {
    rooms {
        id
        title
        capacity
        floor
    }
    events {
        id
        title
        dateStart
        dateEnd
        room {
            id
        }
    }
}
`;

export default graphql(RoomsEventsQuery)(ScheduleRooms);


