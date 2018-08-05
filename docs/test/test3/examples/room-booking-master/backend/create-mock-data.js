const {models, sequelize} = require("./models");

const createData = () => {
    let usersPromise = models.User.bulkCreate([
        {
            login: "veged",
            avatarUrl: "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
            homeFloor: 0
        },
        {
            login: "alt-j",
            avatarUrl: "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
            homeFloor: 3
        },
        {
            login: "yeti-or",
            avatarUrl: "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
            homeFloor: 2
        }
    ]);

    let roomsPromise = models.Room.bulkCreate([
        {
            title: "Бикини Боттом",
            capacity: 5,
            floor: 4
        },
        {
            title: "Карты",
            capacity: 4,
            floor: 2
        },
        {
            title: "Деньги",
            capacity: 4,
            floor: 2
        },
        {
            title: "404 Ствола",
            capacity: 2,
            floor: 2
        },
        {
            title: "Теремок",
            capacity: 6,
            floor: 3
        }
    ]);

    const HOUR = 60 * 60 * 1000;
    let now = new Date();
    let oneHourLater = new Date(now.getTime() + HOUR);
    let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
    let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);

    let eventsPromise = models.Event.bulkCreate([
        {
            title: "ШРИ 2018 - начало",
            dateStart: now,
            dateEnd: oneHourLater
        },
        {
            title: "👾 Хакатон 👾",
            dateStart: oneHourLater,
            dateEnd: twoHoursLater
        },
        {
            title: "🍨 Пробуем kefir.js",
            dateStart: twoHoursLater,
            dateEnd: threeHoursLater
        }
    ]);

    Promise.all([usersPromise, roomsPromise, eventsPromise])
        .then(() => Promise.all([
            models.User.findAll(),
            models.Room.findAll(),
            models.Event.findAll()
        ]))
        .then(([users, rooms, events]) => {
            let promises = [];

            promises.push(events[0].setRoom(rooms[0]));
            promises.push(events[1].setRoom(rooms[1]));
            promises.push(events[2].setRoom(rooms[2]));

            promises.push(events[0].setUsers([users[0], users[1]]));
            promises.push(events[1].setUsers([users[1], users[2]]));
            promises.push(events[2].setUsers([users[0], users[2]]));

            return Promise.all(promises);
        });
};

sequelize.sync()
    .then(createData);
