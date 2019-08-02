import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Icon } from 'antd';
import './main.less';
const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

class Body extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        
        <Layout>
          
          
        </Layout>
      </Layout>
    );
  }
}

export default Body;