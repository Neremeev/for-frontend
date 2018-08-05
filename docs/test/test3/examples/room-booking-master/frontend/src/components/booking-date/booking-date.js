import React from "react";
import moment from "moment";

import {BookingDateText, BookingDateWrapper} from "./booking-date-styled";
import {BookingDateCalendar} from "../booking-date-calendar";
import {Icon} from "../icon/icon";
import {CALENDAR_DATE_FORMAT} from "../../constants";

export const BookingDate = ({toggleCalendar, changeDate, date, isCalendarOpened}) => {
    const prevDay = moment(date).subtract(1, "day").set("hours", 12).startOf("hours");
    const nextDay = moment(date).add(1, "day").set("hours", 12).startOf("hours");
    const currDay = moment(date).format(CALENDAR_DATE_FORMAT);

    //TODO как поменять changeDate + проверить компонент ниже
    return (
        <BookingDateWrapper>
            <Icon background type="arrowLeft" onClick={() => changeDate(prevDay)}/>
            <BookingDateText onClick={toggleCalendar}>{currDay}</BookingDateText>
            <Icon background type="arrowRight" onClick={() => changeDate(nextDay)}/>
            {
                isCalendarOpened
                    ? <BookingDateCalendar
                        date={date}
                        changeDate={changeDate}
                        toggleCalendar={toggleCalendar}
                    />
                    : null
            }
        </BookingDateWrapper>
    );
};

