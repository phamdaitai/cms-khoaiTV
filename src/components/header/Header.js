/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout, Icon, Badge, Avatar, Menu, Dropdown } from 'antd';
import { actAdd } from '../../action/index';
import './header.less';
import NoticeInfo from '../../pages/Header/NoticeInfo';
import PathHeaders from '../../pages/PathHeader/PathHeader';
const { Header } = Layout;

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeState: false
    }
  }

  toggle = () => {
    const { collapsed, addState } = this.props;
    addState(!collapsed);     /*Auto add state to store props */
  };

  stateshowNotice = () => {
    let { noticeState } = this.state;
    this.setState({
      noticeState: !noticeState
    })
  }

  showNotice = () => {
    let { noticeState } = this.state;
    if (noticeState === true) {
      return (
        <div onMouseLeave={this.stateshowNotice} className="notice-block">
          <ul className="notice-title">
            <li className="notice-item">
              <span>User(3)</span>
            </li>
            <li className="notice-item">
              <span>Film(4)</span>
            </li>
          </ul>
          <div className="notice-content scrollbar">
            {/* Data test */}
            <ul className="notification">
              <NoticeInfo />
              <NoticeInfo />
              <NoticeInfo />
              <NoticeInfo />
              <NoticeInfo />
              <NoticeInfo />
              <NoticeInfo />
            </ul>
          </div>
          <ul updateLocale className="notice-footer">
            <li className="notice-footer-item">
              <a><span>Xóa thông báo</span></a>
            </li>
            <li className="notice-footer-item">
              <a><span>Xem tất cả</span></a>
            </li>
          </ul>
        </div>
      )
    }
    else return null;
  }


  render() {
    const { collapsed } = this.props;

    //Dropdown Info Menu Header
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://khoai.tv/">
            <Icon type="user" />
            <span> Đăng xuất</span>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="header" style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <PathHeaders breadcrumb={this.props.breadcrumb} />
        <div className="header-right">
          {/* <Search className="header-search"
          placeholder="input search text"
          // onSearch={value => console.log(value)}
          style={{ width: 200 }}
          /> */}
          {/* Icon notification */}
          <Icon onClick={this.stateshowNotice} type="bell" className="header-icon-bell" />
          {/* Count notification */}
          <a>
            <Badge count={5}>
              <span className="head-example" />
            </Badge>
          </a>
          {this.showNotice()}
          <Dropdown overlay={menu} placement="topRight">
            <div className="header-info-block">
              <Avatar className="header-avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <div className="header-info-text">
                <span>Phạm Đại Tài</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

//Take props from store
const mapStateToProps = (state) => {
  return {
    collapsed: state.changeState
  }
}

//push props to store
const mapDispatchToProps = (dispatch) => {
  return {
    addState: (collapsed) => {
      dispatch(actAdd(collapsed));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers);