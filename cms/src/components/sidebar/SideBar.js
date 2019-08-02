import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Icon} from 'antd';
import {connect} from 'react-redux';
import './style.less';
const { SubMenu } = Menu;
const {Sider} = Layout;

class Sidebar extends Component {
      render() {
        let {collapsed} = this.props;/*Receive props from Header (store)*/
        return (
          <div className="sidebar-cover scrollbar">
            <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
            
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <div className="logo" />
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Người dùng</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="pie-chart" />
                <span>Biểu đồ</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>Tải lên</span>
              </Menu.Item>
              <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Quản lý user</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Danh sách</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Quản lý phim</span>
                    </span>
                  }
                >
                  <Menu.Item key="6">Danh sách</Menu.Item>
                  <Menu.Item key="7">Thêm phim</Menu.Item>
                  <Menu.Item key="8">Top phim</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Quản lý banner</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">Xem banner</Menu.Item>
                  <Menu.Item key="10">Tạo banner mới</Menu.Item>
                </SubMenu>
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