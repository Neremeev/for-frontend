import React from "react";
import {Link} from "react-router-dom";

import {RoomLineWrapper, RoomLineContent} from "./room-line-styled";
import {Event} from "../event";
import {NewEvent} from "../new-event";
import {NewEventService} from "../../services/NewEventService";

export const RoomLine = ({newEvent, activeRoomLine, events, roomId}) => {
    const {offset, isAvailable, duration} = newEvent;
    const {id} = activeRoomLine;
    const newEventLinkOptions = {
        pathname: "create",
        state: {
            event: NewEventService.createNewEvent(duration, roomId)
        }
    };

    return (
        <RoomLineWrapper id="room-line-wrapper">
            <RoomLineContent id="room-line" data-room-line-id={roomId}>
                {
                    events.map(event =>
                        <Event id="event"
                               key={"event" + event.dateStart}
                               event={event}
                        />
                    )
                }
                {
                    isAvailable && id === roomId
                        ? <Link to={newEventLinkOptions}>
                            <NewEvent id="new-event" offset={offset} roomId={roomId}/>
                        </Link>
                        : null
                }
            </RoomLineContent>
        </RoomLineWrapper>
    );
};
