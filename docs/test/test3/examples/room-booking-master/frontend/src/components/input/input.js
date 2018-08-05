import React from "react";
import {
    InputWrapper,
    InputLabel,
    InputContainerWrapper
} from "./input-styled";

export const Input = ({type, label, placeholder, value, onChange, flag}) => (
    <InputContainerWrapper>
        <InputLabel>{label}</InputLabel>
        <InputWrapper type={type} placeholder={placeholder} value={value}
               onChange={onChange} data-flag={flag}
        />
    </InputContainerWrapper>
);
