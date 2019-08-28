import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import './style.less';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    let { collapsed } = this.props;/*Receive props from Header (store)*/
    return (
      <div className="sidebar-cover scrollbar">
        <Sider width={200} trigger={null} collapsible collapsed={collapsed}>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <div className="logo" />
            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span><Link to='/' className="menu-option">Biểu đồ</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="usergroup-add" />
                  <span>Quản lý user</span>
                </span>
              }
            >
              <Menu.Item key="5"><Link to='/users/'
                onClick={() => this.props.getBreadcrumb([{ typeIcon: 'usergroup-add', path: 'users' }])}>Danh sách</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="video-camera" />
                  <span>Quản lý phim</span>
                </span>
              }
            >
              <Menu.Item key="6"><Link to='/films/'
                onClick={() => this.props.getBreadcrumb([{ typeIcon: 'video-camera', path: 'films' }])}>Danh sách</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="hdd" />
                  <span>Thể loại</span>
                </span>
              }
            >
              <Menu.Item key="7"><Link to='/categories/'
                onClick={() => this.props.getBreadcrumb([{ typeIcon: 'hdd', path: 'categories' }])}>Danh sách</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="sliders" />
                  <span>Quản lý banner</span>
                </span>
              }
            >
              <Menu.Item key="8"><Link to='/banners/'
                onClick={() => this.props.getBreadcrumb([{ typeIcon: 'sliders', path: 'banners' }])}>Danh sách</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="setting" />
              <span><Link to='/configs/' className="menu-option"
                onClick={() => this.props.getBreadcrumb([{ typeIcon: 'setting', path: 'configs' }])}>Config</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    collapsed: state.changeState
  }
}

export default connect(mapStateToProps)(Sidebar);