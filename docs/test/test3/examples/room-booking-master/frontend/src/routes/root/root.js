import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {Provider} from "react-redux";

import {client} from "../../client";
import {HomePageContainer} from "../../containers/home-page";
import {EditPageContainer} from "../../containers/edit-page";

export const Root = ({store}) => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={HomePageContainer}/>
                    <Route path="/edit/:id" component={EditPageContainer}/>
                    <Route path="/create" component={EditPageContainer}/>
                </div>
            </Router>
        </Provider>
    </ApolloProvider>
);
