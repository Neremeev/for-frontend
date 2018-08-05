import React, { Component } from 'react';
import './Time.css';
import { word } from '../../language';

class Time extends Component {
	render() {
		let classes = [];
		for (let key in this.props) {
			classes.push(this.props[key]);
		}
		classes = "room-time " + classes.join(" ");

		return  <div className={classes}>
		{word[this.props.time]}
		</div>;
	}
}

     // {this.props.nameRoom} {this.props.nameDay} {this.props.time}">
export default Time;