import React from "react";

export const Date = (props) => {
    const fill = !props.hover
        ? (props.fill ? props.fill : "#AFB4B8")
        : "#000";

    return (
        <svg width="12px" height="12px" viewBox="0 0 12 12">
            <title>calendar</title>
            <desc>Created with Sketch.</desc>
            <defs/>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="assets" transform="translate(-140.000000, -76.000000)">
                    <g id="calendar" transform="translate(138.000000, 74.000000)">
                        <rect id="Rectangle-2" x="0" y="0" width="16" height="16"/>
                        <path
                            d="M3,6 L3,13 L13,13 L13,6 L3,6 Z M12,3 L14,3 L14,14 L2,14 L2,3 L4,3 L4,2 L6,2 L6,3 L10,3 L10,2 L12,2 L12,3 Z M4,7 L4,9 L6,9 L6,7 L4,7 Z M7,7 L7,9 L9,9 L9,7 L7,7 Z M4,10 L4,12 L6,12 L6,10 L4,10 Z"
                            id="ic_calendar" fill={fill} fillRule="nonzero"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};
