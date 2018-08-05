import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import client from './client';
import history from './history'
import store from './redux';

import App from './components/App';

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default Root;
