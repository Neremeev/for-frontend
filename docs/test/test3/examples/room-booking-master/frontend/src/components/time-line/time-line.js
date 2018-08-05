import React from "react";
import {
    TimeLineWrapper,
    TimeLineHour,
    TimeLineContent,
    HourDivider
} from "./time-line-styled";
import {TimeTicker} from "../time-ticker";

export const TimeLine = ({hours, tickerTime, tickerOffset}) => {
    const currHour = tickerTime.split(":")[0];

    return (
        <TimeLineWrapper>
            <TimeLineContent>
                <TimeTicker time={tickerTime} offset={tickerOffset}/>
                {
                    hours.map(hour =>
                        <TimeLineHour key={hour + "hour"} disabled={hour <= currHour}>
                            {hour}
                            <HourDivider/>
                        </TimeLineHour>
                    )
                }
            </TimeLineContent>
        </TimeLineWrapper>
    );
};
