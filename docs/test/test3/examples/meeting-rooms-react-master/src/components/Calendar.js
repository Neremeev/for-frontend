import React, { Component } from 'react';

import Button from '../blocks/Button';
import CalendarMonth from './CalendarMonth';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: 0
        };
    }

    _renderMonths = (count) => {
        return new Array(count).fill().map((_, i) => {
            return(
                <CalendarMonth key={i} count={i}
                    selectedMonth={this.state.selectedMonth}
                    onClick={this.props.onClick}
                />
            )
        });
    }

    _beforeMonth = () => {
        this.setState({
            selectedMonth: this.state.selectedMonth - 1
        });
    };

    _afterMonth = () => {
        this.setState({
            selectedMonth: this.state.selectedMonth + 1
        });
    };

    render() {
        return(
            <div className="calendar">
                <div className="calendar__arrow" onClick={this._beforeMonth}>
                    <Button type="circle" name="arrow-left"/>
                </div>
                <div className="calendar__months">
                    {this._renderMonths(this.props.count)}
                </div>
                <div className="calendar__arrow" onClick={this._afterMonth}>
                    <Button type="circle" name="arrow-right"/>
                </div>
            </div>
        )
    }
}
export default Calendar;
