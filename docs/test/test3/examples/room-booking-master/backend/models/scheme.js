const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        login: Sequelize.STRING,
        homeFloor: Sequelize.INTEGER(1),
        avatarUrl: Sequelize.STRING
    });

    const Room = sequelize.define("Room", {
        title: Sequelize.STRING,
        capacity: Sequelize.INTEGER(2),
        floor: Sequelize.INTEGER(1)
    });

    const Event = sequelize.define("Event", {
        title: Sequelize.STRING,
        dateStart: Sequelize.DATE,
        dateEnd: Sequelize.DATE
    });

    Event.belongsToMany(User, {through: "Events_Users"});
    User.belongsToMany(Event, {through: "Events_Users"});
    Event.belongsTo(Room);
};
