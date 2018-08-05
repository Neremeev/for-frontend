import React from "react";
import {NewEventWrapper} from "./new-event-styled";

export const NewEvent = ({offset, id, roomId}) => (
    <NewEventWrapper
        id={id} offset={offset}
        data-room-line-id={roomId}
    >
        +
    </NewEventWrapper>
);
