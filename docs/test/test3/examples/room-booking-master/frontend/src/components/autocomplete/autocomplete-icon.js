import React from "react";
import {Icon} from "../icon";
import {AutocompleteIconWrapper} from "./autocomplete-styled";

export const AutocompleteIcon = ({icon}) => (
    <AutocompleteIconWrapper type={icon}>
        <Icon type={icon}/>
    </AutocompleteIconWrapper>
);
