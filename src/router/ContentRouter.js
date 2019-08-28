import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Users from '../components/User/index';
import Films from '../components/Film/index';
import Categories from '../components/Category/index';
import Banners from '../components/Banner/index';
import Configs from '../components/Config/index';

class ContentRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path='/users/' component={Users} />
                <Route path='/films/' component={Films} />
                <Route path='/categories/' component={Categories} onEnter={() => this.props.getBreadcrumb('categories')} />
                <Route path='/banners/' component={Banners} />
                <Route path='/configs/' component={Configs} />
                <Route path='/' component={Home} />
            </Switch>
        );
    }
}

export default ContentRouter;