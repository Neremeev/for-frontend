import React from "react";
import {EventWrapper} from "./event-styled";
import {EventTooltip} from "../event-tooltip";
import {Column} from "../../common-style";

export const Event = (props) => {
    const {event, id} = props;
    const {width, offset, title, dateStart} = event;
    const eventTooltipId = `event-tooltip-${title}-${dateStart}`;

    return (
        <Column>
            <EventWrapper
                id={id}
                data-tip
                data-for={eventTooltipId}
                data-delay-hide={80}
                data-effect={"solid"}
                data-place={"bottom"}
                data-type={"light"}
                data-offset={"{'bottom': -10}"}
                width={width}
                offset={offset}
            />
            <EventTooltip event={event} id={eventTooltipId}/>
        </Column>
    )
};
