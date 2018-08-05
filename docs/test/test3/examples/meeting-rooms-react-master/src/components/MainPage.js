import React, { Component } from 'react';

import Header from '../blocks/Header';
import TimeLine from '../blocks/TimeLine';
import ScheduleRooms from './ScheduleRooms';
import CurrentDate from './CurrentDate';
import Grid from '../blocks/Grid';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonCreate:true
        };
    }
    render() {
        return(
            <div className="wrapper">
                <Header buttonCreate={this.state.buttonCreate}/>
                <div className="main">
                    <div className="main__timeline">
                        <CurrentDate />
                        <TimeLine/>
                    </div>
                    <div className="main__schedule">
                        <ScheduleRooms />
                        <Grid/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage;
