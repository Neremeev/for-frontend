import React from "react";
import {ChipWrapper, ChipTitle} from "./chip-styled";
import {Avatar} from "../avatar";
import {Icon} from "../icon";

export class Chip extends React.Component {

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
        const {itemId, avatarUrl, children, onIconClick} = this.props;

        return (
            <ChipWrapper
                onMouseOver={this.hover}
                onMouseOut={this.unHover}
            >
                <Avatar url={avatarUrl}/>
                <ChipTitle>{children}</ChipTitle>
                <Icon
                    hover={this.state.hover}
                    data-item-id={itemId}
                    onClick={onIconClick}
                    type="close"
                />
            </ChipWrapper>
        );
    }
}
