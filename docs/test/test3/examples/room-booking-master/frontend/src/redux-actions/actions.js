import {createActions} from "redux-actions";

const actionCreators = createActions({
    SET_DATE: (date) => date
});

export const {setDate} = actionCreators;
