import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './style.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Register from './register';
import ActivateRegister from './activateRegister';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addShow: false,
      resigterActivate: false
    }
  }

  showDrawer = () => {
    this.setState({
      addShow: true,
    });
  };

  onClose = () => {
    this.setState({
      addShow: false
    });
  };

  otpActivate = (state) => {
    this.setState({
      resigterActivate: state
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Gía trị form đăng nhập: ', values);
      }
    });
  };

  login = () => {
    let { addShow, resigterActivate } = this.state;
    if (addShow === false && resigterActivate === false) {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Vui lòng nhập vào tên!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Tên người dùng"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhập vào mật khẩu!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Mật khẩu"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Lưu mật khẩu</Checkbox>)}
            <a className="login-form-forgot" href>
              Quên mật khẩu
          </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
          </Button>
            <a href onClick={this.showDrawer}>Đăng ký ngay!</a>
          </Form.Item>
        </Form>
      )
    }
    else if (addShow === false && resigterActivate === true) {
      return (
        <ActivateRegister />
      )
    }
  }

  render() {

    return (
      <div className='login'>
        {this.login()}
        < Register
          addShow={this.state.addShow}
          onClose={this.onClose}
          otpActivate={(state) => this.otpActivate(state)}
        />
      </div>
    );
  }
}

export default Form.create()(Login);