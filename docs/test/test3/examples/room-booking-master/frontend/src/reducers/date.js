import {handleAction} from "redux-actions";
import moment from "moment";

moment.locale("ru");

export const date = handleAction(
    "SET_DATE",
    (state, action) => action.payload.format(),
    moment().set("hours", 12).startOf("hours").format()
);
