import React from "react";

export const Edit = (props) => {
    const fill = !props.hover
        ? (props.fill ? props.fill : "#AFB4B8")
        : "#000";

    return (
        <svg width="12px" height="12px" viewBox="0 0 12 12">
            <title>edit</title>
            <desc>Created with Sketch.</desc>
            <defs/>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="assets" transform="translate(-110.000000, -76.000000)">
                    <g id="edit" transform="translate(108.000000, 74.000000)">
                        <rect id="Rectangle" x="0" y="0" width="16" height="16"/>
                        <path
                            d="M13.0793987,5.10592253 C13.3068671,4.87845412 13.3068671,4.49934011 13.0793987,4.28353675 L11.7145883,2.91872631 C11.4987849,2.6912579 11.1196709,2.6912579 10.8922025,2.91872631 L9.81901819,3.98607806 L12.0062144,6.17327428 L13.0793987,5.10592253 Z M2.75,11.0609288 L2.75,13.248125 L4.93719622,13.248125 L11.3879669,6.79152175 L9.20077073,4.60432553 L2.75,11.0609288 Z"
                            id="ic_edit" fill={fill} fillRule="nonzero"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};
