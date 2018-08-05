const {getOne, getList, getEventRoomId} = require("./actions");

describe("Query", () => {
    describe("User", () => {
        it("should return the first user", () => getOne("user"));
        it("should return users list", () => getList("users"));
    });

    describe("Event", () => {
        it("should return the first event", () => getOne("event"));
        it("should return events list", () => getList("events"));
        it("should return the first event roomId", () => getEventRoomId());
    });

    describe("Room", () => {
        it("should return the first room", () => getOne("room"));
        it("should return rooms list", () => getList("rooms"));
    });
});
