const {mock, create, createEvent, updateEvent, update, remove, eventChanges} = require("./actions");

describe("Mutation", () => {
    describe("Event", () => {
        it("should create a new event", () => createEvent(mock.create.Event));
        it("should remove the first user from the first event", () => eventChanges("removeUserFromEvent", "user"));
        it("should add the first user to the first event", () => eventChanges("addUserToEvent", "user"));
        it("should change the first event room", () => eventChanges("changeEventRoom", "room"));
        it("should update the first event", () => updateEvent(mock.update.Event));
        it("should remove the first event", () => remove("Event"));
    });

    describe("User", () => {
        it("should create a new user", () => create("User", mock.create.User));
        it("should update the first user", () => update("User", mock.update.User));
        it("should remove the first user", () => remove("User"));
    });

    describe("Room", () => {
        it("should create a new room", () => create("Room", mock.create.Room));
        it("should update the first room", () => update("Room", mock.update.Room));
        it("should remove the first room", () => remove("Room"));
    });
});
