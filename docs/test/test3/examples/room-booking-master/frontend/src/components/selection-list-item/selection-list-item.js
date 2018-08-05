import React from "react";
import {
    SelectionListItemWrapper,
    SelectionListItemTitle,
    SelectionListItemSubtitle,
    SelectionListItemIconWrapper
} from "../../containers/selection-list/selection-list-styled";
import {Icon} from "../icon/index";

export const SelectionListItem = ({type, title, subtitle, icon, iconColor, onItemClick, onIconClick}) => (
    <SelectionListItemWrapper onClick={onItemClick} type={type}>
        {
            icon &&
            <SelectionListItemIconWrapper>
                <Icon onClick={onIconClick} fill={iconColor} type={icon}/>
            </SelectionListItemIconWrapper>
        }
        <SelectionListItemTitle>{title}</SelectionListItemTitle>
        <SelectionListItemSubtitle>{subtitle}</SelectionListItemSubtitle>
    </SelectionListItemWrapper>
);
