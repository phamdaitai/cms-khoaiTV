import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import User from '../components/User/index';
import Film from '../components/Film/index';


class ContentRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path='/user/' component={User} />
                <Route path='/film/' component={Film} />
                <Route path='/' component={Home} />
            </Switch>
        );
    }
}

export default ContentRouter;