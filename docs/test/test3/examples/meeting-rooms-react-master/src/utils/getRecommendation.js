import moment from 'moment';
import _ from 'lodash';

export default (rooms, users, events, createEvent) => {
    // 1. Учтем количество участников встречи и вместимость переговорок
    let recommendRooms = rooms.filter(room => {
        return !(room.capacity < createEvent.users.length);
    });
    // 1.1. Если нет таких больших переговорок
    if (recommendRooms.length === 0) {
        return {
            title:"Таких переговорок не найдено. Уменьшите количество участников",
            result: []
        };
    }
    // 2. Найдем самый удобный этаж встречи
    let sumFloors = 0;

    createEvent.users.forEach( (createEventuser) => {
        sumFloors += createEventuser.homeFloor
    });

    let convenientFloor = Math.round(sumFloors/createEvent.users.length);

    // 3. Cортируем по удобству этажа
    recommendRooms = _.sortBy(recommendRooms, function(o) { return Math.abs(convenientFloor - o.floor)});

    // 4. Выберем все события этого дня
    const eventsThisDay = events.filter(event => {
        const dateStart = moment(Date.parse(event.dateStart));
        const createEventDay = moment(createEvent.date, 'DD.MM.YYYY');
        return dateStart.isSame(createEventDay, 'day');
    });
    // 4.1. Если в этот день нет событий, то
    if (!eventsThisDay.length > 0) {
        return {
            result: recommendRooms
        };
    }
    //5. Проверка на совпадение времени в переговорке
    let busyRoom = [];
    recommendRooms.forEach(room => {
        //5.1 Проверка, есть ли события в данной переговорке
        const eventsInRecommendRoom = eventsThisDay.filter(event => {
            return room.id === event.room.id;
        });
        if (eventsInRecommendRoom.length === 0) return;

        //5.2 Если есть события сравниваем
        eventsInRecommendRoom.forEach(event => {
            const eventStart = moment(Date.parse(event.dateStart));
            const eventEnd = moment(Date.parse(event.dateEnd));
            const createEventStart = moment(createEvent.date, 'DD.MM.YYYY').set({"hours": createEvent.startTime.slice(0, 2), "minutes": createEvent.startTime.slice(3, 5)});
            const createEventEnd = moment(createEvent.date, 'DD.MM.YYYY').set({"hours": createEvent.endTime.slice(0, 2), "minutes": createEvent.endTime.slice(3, 5)});
            const leftCreateEventPosition = (createEventStart < eventEnd) && (createEventEnd <= eventStart);
            const rightCreateEventPosition = (createEventStart >= eventEnd) && (createEventEnd > eventStart);
            if ( leftCreateEventPosition || rightCreateEventPosition) return
            busyRoom.push(room)
        });
    });
    //6. Убираем переговорки в которых есть совпадение времени
    let result = _.differenceWith(recommendRooms, busyRoom, _.isEqual);

    // 6. Выводим результат
    return {
        title:"Нет свободных переговорок",
        result: result
    }
};
