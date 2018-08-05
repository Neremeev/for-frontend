import React, { Component } from 'react';
import './Header.css';

import { word } from '../../language';

class Header extends Component {
  render() {
    return <header className="header">
				<h1>Бронирование комнат</h1>
				<div className="main-days">
					{this.props.days.map((dayName, index) =>
						<div className="day-name" key={index}>{word[dayName]}</div>
					)}

				</div>
			</header>;
  }
}

export default Header;