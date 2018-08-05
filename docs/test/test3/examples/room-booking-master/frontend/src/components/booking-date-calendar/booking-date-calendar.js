import React from "react";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {DayPickerSingleDateController} from "react-dates";
import {BookingDateCalendarWrapper} from "./booking-date-calendar-styled";
import {Modal} from "../modal";

export const BookingDateCalendar = ({changeDate, toggleCalendar, date}) => {
    const onDateChange = (date) => {
        changeDate(date);
        toggleCalendar();
    };

    return (
        <Modal>
            <BookingDateCalendarWrapper>
                <DayPickerSingleDateController
                    numberOfMonths={1}
                    date={moment(date)}
                    onDateChange={onDateChange}
                    focused={true}
                />
            </BookingDateCalendarWrapper>
        </Modal>
    );
};
