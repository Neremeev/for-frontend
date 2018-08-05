import React, { Component } from 'react';
import './Day.css';
import { word } from '../../language';

import Time from '../time/Time';

class Day extends Component {
  render() {
    return  <div className="room-day">
				<div className="room-day-name">{word[this.props.nameDay]}</div>
				{this.props.time.map((time, index) =>
					<Time nameRoom={this.props.nameRoom} nameDay={this.props.nameDay} time={time} key={index}/>
				)}
			</div>;
  }
}

export default Day;