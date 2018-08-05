const chai = require("chai");
const graphql = require("graphql").graphql;
const expect = chai.expect;

const schema = require("../../../graphql/routes").schema;

const mock = {
    create: {
        User: "login: \"123\", homeFloor: 2, avatarUrl: \" lalala.ru\"",
        Event: "title: \"New Year\", dateStart: \"2017-12-31T21:00:00.000Z\", dateEnd: \"2018-01-01T08:00:00.000Z\"",
        Room: "title: \"The best room\", capacity: 5, floor: 3"
    },
    update: {
        User: "login: \"102030\", homeFloor: 5, avatarUrl: \" lalala.ru\"",
        Event: "title: \"New Year\", dateStart: \"2017-12-31T10:00:00.000Z\", dateEnd: \"2018-01-01T10:00:00.000Z\"",
        Room: "title: \"The worst room\", capacity: 5, floor: -1"
    }
};

const getOne = (type) => {
    const query = `
        query {
            ${type} (id:1) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data[type]).to.be.a("object");
            expect(res.data[type].id).to.equal("1");
        })
};

const getList = (type) => {
    const query = `
        query {
            ${type} {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data[type]).to.be.a("array");
        });
};

const getEventRoomId = () => {
    const query = `
        query {
            event(id:1) {
                room { id }
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data.event.room.id).to.be.a("string");
        });
};

const create = (type, data) => {
    const query = `
        mutation {
            create${type} (input:{${data}}) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data["create" + type].id).to.be.a("string");
        });
};

const createEvent = (data) => {
    const query = `
        mutation {
            createEvent (input:{${data}}, usersIds:[1,2], roomId:1) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data.createEvent.id).to.be.a("string");
        });
};

const updateEvent = (data) => {
    const query = `
        mutation {
            updateEvent (id:1, input:{${data}}, usersIds:[], roomId:4) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data.updateEvent.id).to.be.a("string");
        });
};

const update = (type, data) => {
    const query = `
        mutation {
            update${type} (id:1, input:{${data}}) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data["update" + type].id).to.be.a("string");
        });
};

const remove = (type) => {
    const query = `
        mutation {
            remove${type} (id:1) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data["remove" + type].id).to.be.a("string");
        });
};

const eventChanges = (type, idType) => {
    const query = `
        mutation {
            ${type} (id:1, ${idType}Id: 1) {
                id
            }
        }
    `;

    return graphql(schema, query)
        .then((res) => {
            expect(res.data[type].id).to.be.a("string");
        });
};

module.exports.getOne = getOne;
module.exports.getList = getList;
module.exports.getEventRoomId = getEventRoomId;
module.exports.mock = mock;
module.exports.create = create;
module.exports.createEvent = createEvent;
module.exports.updateEvent = updateEvent;
module.exports.update = update;
module.exports.remove = remove;
module.exports.eventChanges = eventChanges;
