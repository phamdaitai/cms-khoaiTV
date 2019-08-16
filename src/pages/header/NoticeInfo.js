/* eslint-disable jsx-a11y/anchor-is-valid */
    import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';

class NoticeInfo extends Component {
    render() {
        return (
            <li className="notification-li">
                <a className="notification-link">
                    <span className="notification-avatar" ></span>
                    <Avatar className="notification-avatar" style={{ backgroundSize: "2.5rem 2.5rem", width: "2.5rem", height: "2.5rem" }}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span className="notification-group">
                        <span className="notification-name">Adison Lee</span>
                        <span className="notification-content">Trở thành thành viên mới</span>
                        <span className="notification-time">2 minutes ago</span>
                    </span>
                    <Icon type="delete" />
                </a>
            </li>
        );
    }
}

export default NoticeInfo;