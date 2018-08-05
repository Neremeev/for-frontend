import React from "react";
import {
    TimeTickerContent,
    TimerTickerDivider,
    TimerTickerWrapper
} from "./time-ticker-styled";

export const TimeTicker = ({time, offset}) => {
    const hour = parseInt(time.split(":")[0]);
    const isTimeInRange = hour >= 8 && hour < 23;

    const ticker = (
        <TimerTickerWrapper offset={offset}>
            <TimeTickerContent>
                <span>{time}</span>
                <TimerTickerDivider/>
            </TimeTickerContent>
        </TimerTickerWrapper>
    );

    return isTimeInRange ? ticker : null;
};
