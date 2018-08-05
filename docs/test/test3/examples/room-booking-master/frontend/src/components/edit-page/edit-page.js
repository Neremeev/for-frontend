import React from "react";
import {EditForm} from "../../containers/edit-form";
import {Header} from "../header";
import {Column} from "../../common-style";

export const EditPage = props => (
    <Column>
        <Header/>
        <EditForm {...props} />
    </Column>
);
