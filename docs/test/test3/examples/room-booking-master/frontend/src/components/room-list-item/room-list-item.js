import React from "react";
import {
    RoomListItemContent,
    RoomListItemTitle,
    RoomListItemSubtitle,
    RoomListItemWrapper,
} from "./room-list-item-styled";
import {RoomLine} from "../room-line";

export const RoomListItem = ({disabled, title, subtitle, events, freeEvents, roomId, newEvent, activeRoomLine}) => (
    <RoomListItemWrapper>
        <RoomListItemContent disabled={disabled}>
            <RoomListItemTitle disabled={disabled}>{title}</RoomListItemTitle>
            <RoomListItemSubtitle>{subtitle}</RoomListItemSubtitle>
        </RoomListItemContent>
        <RoomLine events={events} freeEvents={freeEvents} roomId={roomId}
                  newEvent={newEvent} activeRoomLine={activeRoomLine}
        />
    </RoomListItemWrapper>
);
