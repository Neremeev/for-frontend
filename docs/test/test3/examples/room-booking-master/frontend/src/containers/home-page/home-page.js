import React from "react";
import {connect} from "react-redux";
import {compose} from "react-apollo";

import {HomePage} from "../../components/home-page";
import {setDate} from "../../redux-actions";
import {
    getRoomList,
    getEventsByDate
} from "../../apollo-actions";

const HomePageContainerWithData = compose(
    getRoomList,
    getEventsByDate
)(HomePage);

const mapStateToProps = store => ({
    date: store.date
});

const mapDispatchToProps = dispatch => ({
    onDateChange: date => dispatch(setDate(date))
});

export const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageContainerWithData);
