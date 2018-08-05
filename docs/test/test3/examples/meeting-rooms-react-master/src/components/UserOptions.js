import React from 'react';
import { withApollo } from 'react-apollo';
import _ from 'lodash';

import { USERS_QUERY } from '../queries';

class UsersOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: {},
        }
    }

    componentWillMount(){
        const client = this.props.client;
        client.query({
            query: USERS_QUERY
        }).then((data) => {
            this.setState({
                loading: false,
                users: data.data.users
            });
        });
    }

    _onClick = (user) => {
        if (this.props.onClick) {
            this.props.onClick(user);
        }
    };

    render(){
        if (this.state.loading) {
            return null;
        }

        let users = this.state.users;
        users = _.differenceWith(users, this.props.selectedUsers, _.isEqual);

        return (
            <div className="select__options">
                {users.map((user)=>
                <div className="select__option" key={user.id} onClick={() => this._onClick(user)}>
                    <div className="user-avatar" style={{backgroundImage: user.avatarUrl ?
                        `url(${user.avatarUrl})` :
                        'url(../static/images/avatar/1.png'}}
                    />
                    <span className="user-name">{user.login}</span>
                    <span className="grey">{user.homeFloor && user.homeFloor} этаж</span>
                </div>
            )}
            </div>
        )
    }
}

export default withApollo(UsersOptions);
