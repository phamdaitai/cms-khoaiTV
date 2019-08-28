import React, { Component } from 'react';
import './App.less';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar/SideBar';
import Headers from './components/Header/Header';
import Contents from './components/Content/Content';
import { Redirect, BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumb: [],
      auth: false
    }
  }

  getBreadcrumb = (breadcrumb) => {
    this.setState({
      breadcrumb
    });
  }

  loginAuth = () => {
    let { auth, breadcrumb } = this.state;
    if (auth) {
      return (
        <Layout>
          <Sidebar
            getBreadcrumb={(breadcrumb) => this.getBreadcrumb(breadcrumb)}
          />
          <Layout>
            <Headers
              breadcrumb={breadcrumb}
              getBreadcrumb={(bc) => this.getBreadcrumb(bc)}
            />
            <Contents />
          </Layout>
        </Layout>
      )
    }
    else {
      return (
        <Redirect to='/login' />
      )
    }
  }

  render() {
    return (
      <Router>
        {this.loginAuth()}
        <AppRouter />
      </Router>
    );
  }
}

export default App;
