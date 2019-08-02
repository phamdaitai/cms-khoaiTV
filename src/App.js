import React,{Component} from 'react';
import './App.less';
import {Layout} from 'antd';
import Sidebar from './components/sidebar/SideBar';
import Headers from './components/header/Header';
import Contents from './components/content/Content';
// const { Header, Sider, Content } = Layout;

class App extends Component {
  render(){
    return (
      <Layout>
        <Sidebar/>
        <Layout>
          <Headers/>
          <Contents/>
        </Layout>
      </Layout>
    );
  }
}

export default App;
