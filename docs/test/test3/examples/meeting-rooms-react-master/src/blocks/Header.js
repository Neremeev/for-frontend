import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="header__sideLeft">
                    <Link className="logo" to="/" />
                </div>
                {this.props.buttonCreate &&
                    <div className="header__sideRight">
                        <Link to="/create">
                            <button className="button buttonCreate">Создать встречу</button>
                        </Link>
                    </div>
                }
            </header>
        )
    }
}

export default Header;
