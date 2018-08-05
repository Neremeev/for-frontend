import React, { Component } from 'react';
import './Room.css';
import { word } from '../../language';

import Day from '../day/Day';

class Room extends Component {
  render() {
  	let classes = "room " + this.props.nameRoom;
    return  <div className={classes}>
				<div className="room-name">{word[this.props.nameRoom]}</div>
				<div className="room-days">
					{this.props.days.map((days, index) =>
						<Day nameRoom={this.props.nameRoom} nameDay={days} time={this.props.time} key={index}/>
					)}
				</div>
			</div>
  }
}

export default Room;