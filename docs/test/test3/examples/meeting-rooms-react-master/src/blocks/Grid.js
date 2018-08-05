import React, { Component } from 'react';
import { startHour, endHour } from '../utils/constants';

import CurrentTime from '../components/CurrentTime';

class Grid extends Component {
    _renderGrid() {
        return new Array(endHour - startHour + 1).fill().map((_, i) => {
            return (
                <div key={i} className="grid" >
                    <div className="grid__line"></div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="schedule__grid">
                {this._renderGrid()}
                <CurrentTime />
            </div>
        )
    }
}

export default Grid;
