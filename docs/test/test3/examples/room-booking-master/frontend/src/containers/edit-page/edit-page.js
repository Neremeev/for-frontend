import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";

import {
    createEvent,
    removeEvent,
    updateEvent,
    getEventsByDate,
    getEventById,
    getRoomList,
    getUserList
} from "../../apollo-actions";
import {setDate} from "../../redux-actions";
import {EditPage} from "../../components/edit-page";

const EditPageContainerWithData = compose(
    createEvent,
    removeEvent,
    updateEvent,
    getEventsByDate,
    getRoomList,
    getEventById,
    getUserList
)(EditPage);

const mapStateToProps = state => ({
    date: state.date
});

const mapDispatchToProps = dispatch => ({
    onDateChange: date => dispatch(setDate(date))
});

export const EditPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPageContainerWithData);
