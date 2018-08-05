import React from "react";
import styled from "styled-components";

const Arrow = (props) => {
    const fill = !props.hover
        ? (props.fill ? props.fill : "#AFB4B8")
        : "#000";

    return (
        <svg className={props.className} width="7px" height="12px" viewBox="0 0 7 12">
            <title>arrow</title>
            <desc>Created with Sketch.</desc>
            <defs/>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round"
               strokeOpacity="0.427536232">
                <g id="главная" transform="translate(-207.000000, -88.000000)" stroke={fill} strokeWidth="2">
                    <g id="Дата" transform="translate(24.000000, 82.000000)">
                        <g id="arrow" transform="translate(179.000000, 7.000000)">
                            <polyline id="Rectangle-4-Copy"
                                      transform="translate(5.000000, 5.000000) rotate(-135.000000) translate(-5.000000, -5.000000) "
                                      points="8 8 2 8 2 2 2 2"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export const ArrowRight = styled(Arrow)``;

export const ArrowDown = styled(Arrow)`
  transform: rotate(90deg);
`;

export const ArrowLeft = styled(Arrow)`
  transform: rotate(180deg);
`;

export const ArrowUp = styled(Arrow)`
  transform: rotate(270deg);
`;
