import React, { Component } from 'react';

class Icon extends Component {

    render() {
        const { name } = this.props;
        const iconClass = "icon_" + name;
        return (
            <div className={"icon " + iconClass}></div>
        )
    }
}

export default Icon;
