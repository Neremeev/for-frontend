import React from "react";
import {IconWrapper} from "./icon-styled";
import {iconHash} from "./icon-hash";

export class Icon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };

        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
    }

    hover() {
        this.setState({hover: true});
    }

    unHover() {
        this.setState({hover: false});
    }

    render() {
        const Icon = iconHash[this.props.type];
        const {hover, fill} = this.props;

        return (
            <IconWrapper
                {...this.props}
                onMouseOver={this.hover}
                onMouseOut={this.unHover}
            >
                <Icon
                    fill={fill}
                    hover={hover || this.state.hover}
                />
            </IconWrapper>
        );
    }
}
