import React from "react";
import {Link} from "react-router-dom";

import {
    DialogBoxBackground,
    DialogBoxWrapper,
    DialogBoxImage,
    DialogBoxTitle,
    DialogBoxSubtitle,
    DialogBoxText,
    DialogBoxSubmitWrapper
} from "./dialog-box-styled";
import {Modal} from "../modal";
import {Button} from "../button/button-styled";

export const DialogBox = ({title, subtitle, text, eventId, isDialog, img, onSubmitClick, onCancelClick}) => (
    <Modal>
        <DialogBoxBackground/>
        <DialogBoxWrapper>
            <DialogBoxImage url={img}/>
            <DialogBoxTitle>{title}</DialogBoxTitle>
            <DialogBoxSubtitle>{subtitle}</DialogBoxSubtitle>
            <DialogBoxText>{text}</DialogBoxText>
            <DialogBoxSubmitWrapper>
                <Link to="/">
                    <Button default data-event-id={eventId} onClick={onSubmitClick}>Ок</Button>
                </Link>
                {
                    isDialog
                        ? <Button default onClick={onCancelClick}>Отмена</Button>
                        : null
                }
            </DialogBoxSubmitWrapper>
        </DialogBoxWrapper>
    </Modal>
);
