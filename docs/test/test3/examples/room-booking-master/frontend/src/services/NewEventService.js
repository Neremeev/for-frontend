import moment from "moment";
import {
    ONE_MINUTE_WIDTH,
    START_HOUR,
    INPUT_DATE_FORMAT,
    TIME_FORMAT
} from "../constants";

export class NewEventService {

    static createNewEvent(newEventDuration, roomId) {
        if (!(newEventDuration && roomId)) return null;

        const {dateStart, dateEnd} = newEventDuration;
        const start = moment(dateStart);

        return {
            roomId,
            date: start.format(INPUT_DATE_FORMAT),
            startTime: start.format(TIME_FORMAT),
            endTime: moment(dateEnd).format(TIME_FORMAT)
        };
    }

    static checkFreeEventsBounds(newEvent, freeEvents) {
        const end = moment(newEvent.dateEnd);
        const start = moment(newEvent.dateStart);

        return freeEvents.some(event => (
            !end.isAfter(event[1]) && start.isSameOrAfter(event[0])
        ));
    }

    static calcNewEventDuration(currentDate, eventOffset, roomLineWidth) {
        const minuteOffset = roomLineWidth * ONE_MINUTE_WIDTH / 100;
        let eventMinutes = eventOffset / minuteOffset - 15,
            eventHours;

        eventHours = parseInt(eventMinutes / 60 + START_HOUR);
        eventMinutes = parseInt(eventMinutes % 60);

        if (eventMinutes < 0) eventHours = START_HOUR;

        const start = moment(currentDate).set({hour: eventHours, minute: eventMinutes});
        const end = moment(start).add(30, "minutes");

        return {
            dateStart: start.format(),
            dateEnd: end.format()
        }
    }

    static calcNewEventOffset(e, freeEventsByRoom, currentDate, activeRoomLine) {
        const {id} = e.target;
        const isRoomLine = id === "room-line";
        const isNewEvent = id === "new-event";

        if (isRoomLine || isNewEvent) {
            const roomLine = e.nativeEvent.path.find(e => e.id === "room-line");
            const {roomLineId} = roomLine.dataset;
            const bounds = roomLine.getBoundingClientRect();
            const {left, width} = bounds;
            const freeEvents = freeEventsByRoom[roomLineId] || [];
            const offset = e.pageX - bounds.left;
            const duration = NewEventService.calcNewEventDuration(currentDate, offset, width);
            const isAvailable = NewEventService.checkFreeEventsBounds(duration, freeEvents);
            const activeRoomLine = {id: roomLineId, left, width};
            const newEvent = {offset, duration, isAvailable};

            return {activeRoomLine, newEvent};
        }

        return activeRoomLine.id ? {activeRoomLine: {}, newEvent: {}} : null;
    }
}
