import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Style from 'style-it';
import { startHour, endHour } from '../utils/constants';

class CurrentTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(),60000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalID);
    }

    tick() {
      this.setState({
        time: moment()
      });
    }

    _renderCurrentTime(selectedDate) {
        const position = calculatePosition(this.state.time, selectedDate, startHour, endHour);

        return (
            Style.it(`
            .currentTime:before {
                content: '${ this.state.time.format("HH:mm") }';
                position: absolute;
                top: -16px;
                left: -24.5px;
                width: 49px;
                height: 20px;
                border-radius: 100px;
                background-color: #007dff;
                font-weight: 700;
                font-size: 11px;
                color: #fff;
                letter-spacing: 0.4px;
                text-align: center;
                line-height: 20px;
              }
            `,
            <div className="currentTime" style={{ ...position }} />
            )
        );

        function calculatePosition(currentTime, currentDay, startHour, endHour) {
            const gridStart = Number(selectedDate.startOf('day').add(7.5, 'h'));
            const gridEnd = Number(selectedDate.startOf('day').add(23.5, 'h'));
            const current = Number(moment(currentTime));
            const columnsCount = gridEnd - gridStart;
            let leftPadding = current - gridStart;
            let left = leftPadding/columnsCount*100;
            if (left < 0) left = 0
            if (left > 96.875) left = 96.875
            return {
                left: `${left}%`,
            };
        }
    }

    render() {
        let selectedDate = this.props.selectedDate;
        if (!selectedDate.isSame(moment(this.state.time), 'day')) {
            return null;
        }

        return (
            <div>
                {this._renderCurrentTime(selectedDate)}
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        selectedDate: store.selectedDate
    };
}

export default connect(mapStateToProps)(CurrentTime);
