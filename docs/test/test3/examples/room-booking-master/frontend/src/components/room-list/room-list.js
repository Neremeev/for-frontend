import React from "react";
import {
    RoomListContent,
    RoomListWrapper,
    RoomListFloor,
    RoomListFloorWrapper
} from "./room-list-styled";
import {RoomListItem} from "../room-list-item";

const empty = [];

export const RoomList = ({rooms, freeEventsByRoom, eventsByRoom, newEvent, activeRoomLine}) => (
    <RoomListWrapper>
        <RoomListContent>
            {
                rooms
                    ? Object.keys(rooms).reverse().map(floor => (
                        <RoomListFloorWrapper key={floor + "floor"}>
                            <RoomListFloor>{floor} ЭТАЖ</RoomListFloor>
                            {
                                rooms[floor].map(room => (
                                    <RoomListItem
                                        key={room.title + "room"}
                                        roomId={room.id}
                                        title={room.title}
                                        subtitle={`до ${room.capacity} человек`}
                                        events={
                                            eventsByRoom[room.id]
                                                ? eventsByRoom[room.id]
                                                : empty
                                        }
                                        freeEvents={
                                            freeEventsByRoom
                                                ? freeEventsByRoom[room.id]
                                                : null
                                        }
                                        disabled={
                                            freeEventsByRoom
                                                ? !(freeEventsByRoom[room.id].length)
                                                : false
                                        }
                                        newEvent={newEvent}
                                        activeRoomLine={activeRoomLine}
                                    />
                                ))
                            }
                        </RoomListFloorWrapper>
                    ))
                    : null
            }
        </RoomListContent>
    </RoomListWrapper>
);
