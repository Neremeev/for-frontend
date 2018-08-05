import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

import {Column} from "../../common-style";
import {Button} from "../button";
import {Header} from "../header";
import {RoomBooking} from "../../containers/room-booking";
import {INPUT_DATE_FORMAT} from "../../constants";

export const HomePage = ({roomList, eventList, date, onDateChange}) => (
    <Column>
        <Header>
            <Link to={{
                pathname: "create",
                state: {event: {date: moment(date).format(INPUT_DATE_FORMAT)}}
            }}>
                <Button primary>Создать встречу</Button>
            </Link>
        </Header>
        <RoomBooking
            rooms={roomList}
            events={eventList}
            date={date}
            onDateChange={onDateChange}
        />
    </Column>
);
