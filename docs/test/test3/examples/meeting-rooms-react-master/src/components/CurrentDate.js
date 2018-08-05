import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Button from '../blocks/Button';
import Calendar from './Calendar';

const ClickOutHandler = require('react-onclickout');

class CurrentDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    // клик вне компонента
    onClickOut= (e) => {
        this.setState({
            show: false,
        });
    }

    _hideCalendar = () => {
        this.setState({
            show: false,
        });
    };

    _showCalendar = () => {
        this.setState({
            show: true,
        });
    };

    _handleKeyDown = (e) => e.stopPropagation();

    render() {
        let { selectedDate } = this.props;
            selectedDate = selectedDate.isSame(moment(), 'day') ?
                `${selectedDate.format('D MMM', 'ru')} · Сегодня` :
                selectedDate.format('D MMMM', 'ru');

        return(
            <ClickOutHandler onClickOut={this.onClickOut} >
                <div className="currentDate">
                    <div onClick={this.props.beforeDay}>
                        <Button type="circle" name="arrow-left" />
                    </div>
                        <div className="currentDate__title" onClick={!this.state.show ?
                                this._showCalendar :
                                this._hideCalendar}>
                            {selectedDate}
                            <div className={"calendar-wrapper"} onClick={this._handleKeyDown}>
                                {this.state.show && <Calendar count={3} /> }
                            </div>
                        </div>
                    <div onClick={this.props.afterDay}>
                        <Button type="circle" name="arrow-right" />
                    </div>
                </div>
            </ClickOutHandler>
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
        beforeDay: function() {
            dispatch({type:"BEFORE_DATE"});
        },
        afterDay: function() {
            dispatch({type:"AFTER_DATE"});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDate);
