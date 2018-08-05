import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class CalendarMonths extends Component {

    _onClick = (name, value) => {
        if (this.props.onClick) {
            this.props.onClick(name, value);
        }
    }

    render() {
        const months_array = ['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        const days_array = ['Пн', 'Вт', 'Ср', 'Чт','Пт', 'Сб', 'Вс'];
        const currentMonth = moment().startOf('month');
        const selectedMonth = currentMonth.add(this.props.selectedMonth + this.props.count, 'month');
        const monthNumber = selectedMonth.month();
        let firstDayInMonth = selectedMonth.day();
        const daysInMonth = selectedMonth.daysInMonth();
        const selectedYear = selectedMonth.year();
        if (firstDayInMonth === 0) firstDayInMonth = 7;

        return(
            <div className="calendar__month">
                <div className="calendar__month-names">{months_array[monthNumber]}
                    <span className="calendar__month-year">{selectedYear}</span>
                </div>
                <div className="calendar__days">
                    {// Вывод месяца и года
                        days_array.map((dayName, i) => {
                            return (
                                <div key={i} className="calendar__ceil">
                                    <span>{dayName}</span>
                                </div>
                            )
                        })
                    }
                    {// Вывод пустых дней в первой неделе
                        new Array(firstDayInMonth-1).fill().map((_, i) => {
                            return <div key={i} className="calendar__ceil"></div>
                        })
                    }
                    { // Вывод остальных дней в месяце
                        new Array(daysInMonth).fill().map((_, i) => {
                            let day = selectedMonth.add((i===0) ? 0 : 1,"day");
                            let selectedDay = moment(day);
                            const currentDayClass = (day.isSame(moment(),'day')) ? "calendar__currentday" : "";

                            return (
                                <div key={i} className={"calendar__ceil calendar__day "+ currentDayClass}
                                onClick={ () => {
                                        this._onClick('date', selectedDay.format("DD.MM.YYYY"));
                                        this.props.changeDay(selectedDay);
                                    }
                                }>
                                    <span>{day.format("D")}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        selectedDate: store.selectedDate
    };
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        changeDay: function(value) {
                dispatch({type:"CHANGE_DATE", value:value});
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonths);
