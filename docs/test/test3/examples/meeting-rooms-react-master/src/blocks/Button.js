import React, { Component } from 'react';
import Icon from './Icon';

class Button extends Component {

    _onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        const { type, name} = this.props;
        return (
            <div className={'button-' + type} onClick={this._onClick}>
                <Icon name={name} />
            </div>
        )
    }
}

export default Button;
