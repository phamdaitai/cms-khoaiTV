import React, { Component } from 'react';
import { Layout } from 'antd';
import ContentRouter from '../../router/ContentRouter';
import './content.less';
const { Content } = Layout;

class Contents extends Component {

  render() {
    return (
      <Content
        className="content"
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 500,
        }}
      >
        <ContentRouter />
      </Content>
    );
  }
}

export default Contents;