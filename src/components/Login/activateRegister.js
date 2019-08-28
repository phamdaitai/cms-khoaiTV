import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

class ActivateRegister extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Mã otp: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('otp', {
            rules: [{ required: true, message: 'Vui lòng nhập mã otp!' }],
          })(
            <Input
              prefix={<Icon type="login" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nhập mã otp"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ActivateRegister);