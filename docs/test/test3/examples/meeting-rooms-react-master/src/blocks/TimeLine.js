import React, { Component } from 'react';
import { startHour, endHour } from '../utils/constants';

class TimeLine extends Component {

    _renderTimeLine() {
        return new Array(endHour - startHour + 1).fill().map((_, i) => {
            let hour = i + 8;
            hour = (hour === 8) ? `${hour + ':00'}` : hour;
            return(<div key={i} className="timeline__hour" >{hour}</div>);
        });
    }

    render() {
        return (
            <div className="timeline">
                {this._renderTimeLine()}
            </div>
        )
    }
}

export default TimeLine;
