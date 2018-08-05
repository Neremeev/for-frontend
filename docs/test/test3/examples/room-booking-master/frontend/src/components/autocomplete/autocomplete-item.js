import React from "react";
import {
    AutocompleteItemWrapper,
    AutocompleteItemAvatarWrapper,
    AutocompleteItemTitleWrapper,
    AutocompleteItemTitle,
    AutocompleteItemSubtitle
} from "./autocomplete-styled";
import {Avatar} from "../avatar";

export const AutocompleteItem = ({avatar, title, subtitle}) => (
    <AutocompleteItemWrapper>
        <AutocompleteItemAvatarWrapper>
            <Avatar url={avatar}/>
        </AutocompleteItemAvatarWrapper>
        <AutocompleteItemTitleWrapper>
            <AutocompleteItemTitle>
                {title}
            </AutocompleteItemTitle>
            {" · "}
            <AutocompleteItemSubtitle>
                {subtitle}
            </AutocompleteItemSubtitle>
        </AutocompleteItemTitleWrapper>
    </AutocompleteItemWrapper>
);
