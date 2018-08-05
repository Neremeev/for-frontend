import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

import {
    CALENDAR_DATE_FORMAT,
    TIME_FORMAT
} from "../../constants";
import {
    EventTooltipWrapper,
    EventContentWrapper,
    EventContent,
    EventTitle,
    EventSubtitle,
    EventParticipantsWrapper,
    EventParticipants,
    EventMainParticipant,
    EventParticipantsOther,
    EventIcon
} from "./event-tooltip-styled";
import {Icon} from "../icon";

export const EventTooltip = ({event, id}) => {
    const {title, dateStart, dateEnd, room, users} = event;
    const date = moment(dateStart).format(CALENDAR_DATE_FORMAT);
    const timeStart = moment(dateStart).format(TIME_FORMAT);
    const timeEnd = moment(dateEnd).format(TIME_FORMAT);
    const content = `${date}, ${timeStart} — ${timeEnd} · ${room.title}`;

    return (
        <EventTooltipWrapper id={id}>
            <EventContentWrapper>
                <EventContent>
                    <EventTitle>{title}</EventTitle>
                    <Link to={"edit/" + event.id}>
                        <EventIcon><Icon background type="edit"/></EventIcon>
                    </Link>
                    <EventSubtitle>{content}</EventSubtitle>
                    <EventParticipantsWrapper>
                        <EventParticipants>
                            <EventMainParticipant>
                                {users[0] ? users[0].login : null}
                            </EventMainParticipant>
                            &nbsp;
                            <EventParticipantsOther>
                                {(users[0] ? `и ${users.length - 1}` : 0) + " участников"}
                            </EventParticipantsOther>
                        </EventParticipants>
                    </EventParticipantsWrapper>
                </EventContent>
            </EventContentWrapper>
        </EventTooltipWrapper>
    );
};
