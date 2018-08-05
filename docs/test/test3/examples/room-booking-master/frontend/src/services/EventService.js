import moment from "moment";
import {START_HOUR, END_HOUR} from "../constants";

export class EventService {

    static sortEventsByDate(eventList) {
        return [...eventList].sort((first, second) =>
            moment(first.dateStart).isAfter(second.dateStart) ? 1 : -1
        )
    }

    static groupEventsByRoom(events) {
        let roomId;

        return events.reduce((eventList, event) => {
            roomId = event.room.id;

            if (eventList[roomId]) {
                eventList[roomId].push(event);
            }
            else {
                eventList[roomId] = [event];
            }

            return eventList;
        }, {});
    }

    static groupFreeEventsByRoom(eventsByRoom, roomList, currentDate) {
        const startOfDay = moment(currentDate).set("hours", START_HOUR).format();
        const endOfDay = moment(currentDate).set("hours", END_HOUR).format();
        let freeStartTime;

        return roomList
            .map(room => room.id)
            .reduce((freeEventsByRoom, roomId) => {
                if (!eventsByRoom[roomId]) {
                    freeEventsByRoom[roomId] = [[startOfDay, endOfDay]];
                    return freeEventsByRoom;
                }

                freeStartTime = startOfDay;

                freeEventsByRoom[roomId] = eventsByRoom[roomId].reduce((freeEventList, event) => {
                    if (moment(event.dateStart).diff(freeStartTime, "minutes") >= 30) {
                        freeEventList.push([freeStartTime, event.dateStart]);
                    }
                    freeStartTime = event.dateEnd;

                    return freeEventList;
                }, []);

                if (moment(endOfDay).diff(freeStartTime, "minutes") >= 30)
                    freeEventsByRoom[roomId].push([freeStartTime, endOfDay]);

                return freeEventsByRoom;
            }, {});
    }
}
