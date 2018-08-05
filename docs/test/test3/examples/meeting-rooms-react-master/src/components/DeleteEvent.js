import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { REMOVE_EVENT_MUTATION, GET_EVENTS_QUERY } from '../queries';

class DeleteEvent extends Component {
    _onClick = () => {
        this.props.removeEvent({
            variables: {
                id: this.props.eventId
            },
            refetchQueries: [{
            query:GET_EVENTS_QUERY
            }]
        })
        .then(({ data: {removeEvent} }) => {
            this.props.history.push({
                pathname: '/',
                state: removeEvent
            })
        })
    };

    render() {
        if (this.props.removeEvent.loading) {
            return null;
        }

        return (
            <Link to="/">
                <button className={"button"} onClick={this._onClick}>
                    Удалить встречу
                </button>
            </Link>
        )
    };
}

export default compose(
    graphql(REMOVE_EVENT_MUTATION, {name: 'removeEvent'})
)(withRouter(DeleteEvent))
