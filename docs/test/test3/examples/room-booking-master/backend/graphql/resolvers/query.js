const {models} = require("../../models");
const sequelize = require("sequelize");
const {where, fn, col} = sequelize;

module.exports = {
    event(root, {id}) {
        return models.Event.findById(id);
    },
    events() {
        return models.Event.findAll();
    },
    eventsByDate(root, args, context) {
        return models.Event.findAll({
            where: where(
                fn('date', col('dateStart')),
                fn('date', args.date)
            )
        }, context);
    },
    user(root, {id}) {
        return models.User.findById(id);
    },
    users() {
        return models.User.findAll();
    },
    room(root, {id}) {
        return models.Room.findById(id);
    },
    rooms() {
        return models.Room.findAll();
    }
};
