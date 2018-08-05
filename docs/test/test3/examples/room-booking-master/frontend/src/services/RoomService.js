import moment from "moment";
import {TIME_FORMAT} from "../constants";

export class RoomService {

    static groupRoomsByFloor(rooms) {
        let roomFloor;

        return rooms.reduce((roomList, room) => {
            roomFloor = room.floor;

            if (roomList[roomFloor]) {
                roomList[roomFloor].push(room);
            }
            else {
                roomList[roomFloor] = [room];
            }

            return roomList;
        }, {});
    }

    static searchFreeRooms(freeEventsByRoom, roomList = [], {startTime, endTime, date}) {
        if (!freeEventsByRoom) return [];

        const timeStart = moment(startTime, TIME_FORMAT, true);
        const timeEnd = moment(endTime, TIME_FORMAT, true);
        const day = moment(date);
        const startDate = timeStart.isValid()
            ? moment(day).set({"hour": timeStart.hour(), "minute": timeStart.minute()})
            : day;
        const endDate = timeEnd.isValid() && timeEnd.isAfter(timeStart)
            ? moment(day).set({"hour": timeEnd.hour(), "minute": timeEnd.minute()})
            : day;
        let time;

        return roomList.reduce((freeRoomList, room) => {
            if (!freeEventsByRoom[room.id].length) return freeRoomList;

            time = freeEventsByRoom[room.id].find(duration => (
                moment(startDate).isBetween(duration[0], duration[1], null, '[)')
            ));
            if (!time) {
                time = freeEventsByRoom[room.id][0];
            }
            else {
                time = moment(endDate).isBetween(time[0], time[1], null, '(]') ? [startDate.format(), endDate.format()] : time
            }
            freeRoomList.push({...room, time});

            return freeRoomList;
        }, []);
    }
}
