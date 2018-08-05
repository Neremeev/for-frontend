import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../blocks/Icon';

class Tool extends Component {
    render() {
        return(
            <Link to="/create">
                <div className="tool" style={this.props.toolStyle} >
                    <Icon name="plus"/>
                </div>
            </Link>
        )
    }
}
export default Tool;
