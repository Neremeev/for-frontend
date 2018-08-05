import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './MainPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';

class NotFound extends Component {
    render() {
        return <h2>Страница не найдена</h2>
    }
}

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/create" component={CreatePage} />
                <Route path="/edit/:eventId" component={EditPage} />
                <Route component={NotFound} />
            </Switch>

        )
    }
}

class App extends Component {
    render() {
        return(
            <Main />
        )
    }
}

export default App;
