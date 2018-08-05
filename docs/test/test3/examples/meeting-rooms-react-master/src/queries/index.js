import gql from 'graphql-tag';

export const USERS_QUERY = gql`
query UsersQuery {
    users {
        id
        login
        homeFloor
        avatarUrl
    }
}`;

export const ROOMS_QUERY = gql`
query RoomsQuery {
    rooms {
        id
        title
        capacity
        floor
    }
}`;

export const EVENTS_QUERY = gql`
query EventsQuery {
    events {
        id
        title
        dateStart
        dateEnd
        room {
            id
        }
    }
}`;

export const GET_EVENT_QUERY = gql`
    query Event($id: ID!) {
        event(id: $id) {
        title
        id
        dateStart
        dateEnd
        room {
            id
            title
            floor
            capacity
        }
        users {
            id
            login
            avatarUrl
            homeFloor
        }
    }
}`;

export const CREATE_EVENT_MUTATION = gql`
mutation CreateEvent($eventInput: EventInput!, $usersIds: [ID], $roomId: ID!) {
    createEvent(input: $eventInput, usersIds: $usersIds, roomId: $roomId) {
        title
        dateStart
        dateEnd
        room {
            title
            floor
        }
    }
}`;

export const REMOVE_EVENT_MUTATION = gql`
mutation RemoveEvent($id: ID!) {
    removeEvent(id: $id) {
        id
    }
}`;

export const UPDATE_EVENT_MUTATION = gql`
mutation UpdateEvent($id: ID!, $eventInput: EventInput!, $usersIds: [ID], $roomId: ID) {
    updateEvent(id: $id, input: $eventInput, usersIds: $usersIds, roomId: $roomId) {
        id
        title
    }
}`;

export const GET_EVENTS_QUERY = gql`
query GetEvents {
    events {
        id
        dateStart
        dateEnd
        title
        room {
            id
        }
    users {
        homeFloor
        login
        avatarUrl
      }
    }
}`;
