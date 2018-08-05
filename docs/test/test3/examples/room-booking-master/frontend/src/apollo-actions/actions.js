import {graphql} from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import {INPUT_DATE_FORMAT} from "../constants";

/**
 * Queries
 */
const eventsByDateQuery = gql`
    query ($date: Date!) {
       eventsByDate(date: $date) {
            id, title, dateStart, dateEnd, room{id, title, floor}, users{id, login, avatarUrl}
       }
    }
`;

const getEventByIdQuery = gql`
    query event($id: ID!) {
        event(id: $id) {
            id, title, dateStart, dateEnd, room{id}, users{id, login, avatarUrl}
        }
    }
`;

const getUserListQuery = gql`
    query { 
        users {
            id, login, avatarUrl, homeFloor
        }
    }
`;

const getRoomListQuery = gql`
    query {
        rooms {
            id, title, capacity, floor
        }
    }
`;

export const getEventsByDate = graphql(
    eventsByDateQuery,
    {
        options: (props) => ({
            variables: {date: moment(props.date).set("hours", 12).startOf("hours").format()}
        }),
        props: ({data: {eventsByDate}}) => ({eventList: eventsByDate})
    }
);

export const getEventById = graphql(
    getEventByIdQuery,
    {
        options: ({match: {params}}) => ({variables: {id: params.id | null}}),
        props: ({data: {event}}) => ({event})
    }
);

export const getUserList = graphql(
    getUserListQuery,
    {
        props: ({data: {users}}) => ({userList: users})
    }
);

export const getRoomList = graphql(
    getRoomListQuery,
    {
        props: ({data: {rooms}}) => ({roomList: rooms})
    }
);


/**
 * Mutations
 */
const createEventQuery = gql`
    mutation createEvent($input: EventInput!, $usersIds: [ID]!, $roomId: ID!) {
        createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
            id, title, dateStart, dateEnd,  room{id, floor, title}, users{id, login, avatarUrl}
        }
    }
`;

const removeEventQuery = gql`
    mutation removeEvent($id: ID!) {
       removeEvent(id: $id) {
            id, dateStart
        }
    }
`;

const updateEventQuery = gql`
    mutation updateEvent($id: ID!, $input: EventInput!, $usersIds: [ID]!, $roomId: ID!) {
        updateEvent(id: $id, input: $input, usersIds: $usersIds, roomId: $roomId) {
            id, title, dateStart, dateEnd, room{id, floor, title}, users{id, login, avatarUrl}
        }
    }
`;

export const createEvent = graphql(
    createEventQuery,
    {
        props: ({mutate}) => ({
            createEvent: ({usersIds, roomId, input}) => mutate({
                variables: {
                    usersIds,
                    roomId,
                    input
                }
            })
        }),
        options: {
            update: (proxy, {data: {createEvent}}) => {
                const date = moment(createEvent.dateStart).set("hours", 12).startOf("hours").format();
                const data = proxy.readQuery({
                    query: eventsByDateQuery,
                    variables: {date}
                });

                data.eventsByDate.push(createEvent);
                proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
            }
        }
    }
);

export const removeEvent = graphql(
    removeEventQuery,
    {
        props: ({mutate}) => ({
            removeEvent: (id) => mutate({
                variables: {id}
            })
        }),
        options: {
            update: (proxy, {data: {removeEvent}}) => {
                const {id, dateStart} = removeEvent;
                const date = moment(dateStart).set("hours", 12).startOf("hours").format();
                const data = proxy.readQuery({
                    query: eventsByDateQuery,
                    variables: {date}
                });
                const events = data.eventsByDate;
                const index = events.findIndex(item => item.id === id);

                events.splice(index, 1);
                proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
            }
        }
    }
);

export const updateEvent = graphql(
    updateEventQuery,
    {
        props: (props) => ({
            updateEvent: ({id, usersIds, roomId, input, lastDate}) => props.mutate({
                variables: {
                    id,
                    usersIds,
                    roomId,
                    input
                },
                update: (proxy, {data: {updateEvent}}) => {
                    const {id, dateStart} = updateEvent;
                    const date = moment(dateStart).set("hours", 12).startOf("hours").format();
                    const data = proxy.readQuery({
                        query: eventsByDateQuery,
                        variables: {date}
                    });
                    const prevDateString = moment(lastDate).format(INPUT_DATE_FORMAT);
                    const nextDateString = moment(dateStart).format(INPUT_DATE_FORMAT);
                    let events = data.eventsByDate;
                    let index = events.findIndex(item => item.id === id);

                    if (prevDateString === nextDateString) {
                        events[index] = {...updateEvent};
                        return proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});
                    }

                    data.eventsByDate.push(updateEvent);
                    proxy.writeQuery({query: eventsByDateQuery, variables: {date}, data});

                    const prevDate = moment(prevDateString).set("hours", 12).startOf("hours").format();
                    const prevData = proxy.readQuery({
                        query: eventsByDateQuery,
                        variables: {date: prevDate}
                    });

                    events = prevData.eventsByDate;
                    index = events.findIndex(item => item.id === id);
                    events.splice(index, 1);
                    proxy.writeQuery({query: eventsByDateQuery, variables: {date: prevDate}, data: prevData});
                }
            })
        })
    }
);
