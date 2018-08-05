const { models, sequelize } = require('./models');

function createData () {
  let usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2
    }
  ]);

  let roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 2
    },
    {
      title: '14',
      capacity: 6,
      floor: 3
    },
    {
      title: 'Прачечная',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Мариванна',
      capacity: 6,
      floor: 5
    },
    {
      title: 'Джокер',
      capacity: 10,
      floor: 5
    },
    {
      title: 'Красная икра',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Минкульт',
      capacity: 10,
      floor: 5
    },
    {
      title: 'Оранжевое солнце',
      capacity: 10,
      floor: 3
    },
    {
      title: 'Оранжевый верблюд',
      capacity: 4,
      floor: 3
    },
    {
      title: '4.Сыра',
      capacity: 6,
      floor: 5
    },
    {
      title: 'YellowSubmarine',
      capacity: 8,
      floor: 6
    },
    {
      title: 'Kino',
      capacity: 6,
      floor: 7
    },
    {
      title: 'Синий Кит',
      capacity: 10,
      floor: 6
    }
  ]);

  const HOUR = 60 * 60 * 1000;
  let now = new Date();
  let oneHourLater = new Date(now.getTime() + HOUR);
  let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);

  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: now,
      dateEnd: oneHourLater
    },
    {
      title: 'Хакатон',
      dateStart: oneHourLater,
      dateEnd: twoHoursLater
    },
    {
      title: 'Пробуем kefir.js',
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
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
