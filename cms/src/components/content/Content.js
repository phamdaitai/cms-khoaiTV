import React,{ Component } from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import PageHeaders from '../page-header/PageHeader';
import Home from '../home/Home';
const {Content} = Layout;

class Contents extends Component {
    render() {
        return (
            <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 800,
            }}
          >
            <PageHeaders/>
            <Home/>
          </Content>
        );
    }
}

export default Contents;