import React,{Component} from 'react';
import './App.less';
import {Layout} from 'antd';
import Sidebar from './components/Sidebar/SideBar';
import Headers from './components/Header/Header';
import Contents from './components/Content/Content';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <Router>
        <Layout>
          <Sidebar/>
          <Layout>
            <Headers/>
            <Contents/>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
