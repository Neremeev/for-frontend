import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';

import EventForm from './EventForm';
import { GET_EVENT_QUERY } from '../queries';

class EditPage extends Component {

    render() {
        if(this.props.currentEvent.loading) {
            return <p>Loading ...</p>;
        }

        const event = {...this.props.currentEvent.event};

        let dateStart = event.dateStart;
        let dateEnd =  event.dateEnd;

        event.date =  moment(Date.parse(dateStart)).format("DD.MM.YYYY");
        event.startTime  = moment(Date.parse(dateStart)).format("HH:mm");
        event.endTime = moment(Date.parse(dateEnd)).format("HH:mm");

        return(
            <EventForm event={event} typeForm ="edit" />
        )
    }
}

export default graphql(GET_EVENT_QUERY, {
    options: ({match}) => ({ variables: {id : match.params.eventId} }),
    name: 'currentEvent'
})(EditPage);
