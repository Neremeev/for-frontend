import React, { Component } from 'react';
import './App.css';

import Header from './components/header/Header';
import Room from './components/room/Room';

class App extends Component {

	componentDidMount() {
		let arrInLocalStorage = [];

		function setDisRoom (target){
			let arrClass = target.classList.value.split(' ');
			arrClass.shift();
			let newDisable = [arrClass[0], arrClass[1], arrClass[2]];
			arrInLocalStorage.push(newDisable);
			let serialArr = JSON.stringify(newDisable);
			localStorage.setItem("room" + arrInLocalStorage.length, serialArr);
			target.classList.add("dis");
		}

		document.querySelector('.content').addEventListener("click", function(event) {
			if (event.target.classList.contains('room-time') && !event.target.classList.contains('dis')) {
				setDisRoom (event.target);
			}
		});

		for (let key in localStorage) {
			if (key.indexOf("room") === 0) {
				arrInLocalStorage.push(JSON.parse(localStorage[key]));
				if (document.querySelector("." + JSON.parse(localStorage[key]).join("."))) {
					document.querySelector("." + JSON.parse(localStorage[key]).join(".")).classList.add("dis");
				}
			}
		}
	}
	render() {
		const data = this.props.dataSPA;
		return  <div className="app">
					<Header days={data.day}/>
					<section className="content">
				    	{data.nameRoom.map((nameRoom, index) =>
				    		<Room nameRoom={nameRoom} days={data.day} time={data.time} key={index}/>
				    	)}
					</section>

				</div>;
	}
}
export default App;