/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import React, { Component } from 'react';
import {
  Drawer, Form, Input, Tooltip, Icon, Select, Button, Checkbox, Row, Col
} from 'antd';
import './style.less';
import 'antd/dist/antd.css';
const { Option } = Select;

class Forms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        let valuesTemp = {};
        for (let key in values) {
          if (key !== "confirm") {
            valuesTemp[key] = values[key];
          }
        }
        this.props.getDataForm(valuesTemp); //Nhan gia tri form
        this.props.form.resetFields();
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp !');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  optionSelect = (option) => {
    let typeName = [];
    if (this.props.field.title === "Tạo tài khoản") {
      typeName = ["Quản trị viên", "Tài khoản thường", "Tài khoảng VIP"];
    }
    let optionSelect = option.map((item, index) => {
      return (
        <Option value={item.value} key={index}>{typeName[item.value]}</Option>
      )
    });
    return optionSelect;
  }

  checkboxItem = (option) => {
    let mapCheckbox = option.map((item, index) => {
      return (
        <Col span={8}>
          <Checkbox value={item.value} disabled={item.disabled}>{item.value}</Checkbox>
        </Col>
      )
    })
    return mapCheckbox;
  }

  addInput = (name) => {
    if (this.state[name] === undefined) {
      console.log(name);
      this.setState({
        [name]: 1
      })
    } else {
      this.setState({
        [name]: this.state[name] + 1
      })
    }
  }

  subInput = (name) => {
    let sub;
    if (this.state[name] > 1)
      sub = this.state[name] - 1;
    this.setState({
      [name]: sub
    })
  }

  showInputAdd = (name) => {
    let quantityInput = [];
    for (let i = 0; i < this.state[name]; i++) {
      quantityInput.push(
        <div>
          <Input key={i} style={{ width: '90%', float: "left" }} />
          <Icon type="minus-circle" style={{ cursor: "pointer" }}
            onClick={() => this.subInput(name)} />
        </div>
      )
    }
    return quantityInput;
  }

  addForm = (getFieldDecorator, tailFormItemLayout) => {
    let { field } = this.props.field;

    let mapForm = field.map((item, index) => {
      switch (item.type) {
        case "input":
          switch (item.typeInput) {
            case "email": {
              return (
                <Form.Item label={`${item.label}`}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [
                      {
                        type: `${item.typeInput}`,
                        message: `${item.messageError}`,
                      },
                      {
                        required: true,
                        message: `${item.messageNull}`,
                      },
                    ],
                  })(<Input disabled={item.disabled} />)}
                </Form.Item>
              )
            }
            case "nickName": {
              return (
                <Form.Item
                  label={
                    <span>
                      {item.label}&nbsp;
                      <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}`, whitespace: true }],
                  })(<Input disabled={item.disabled} />)}
                </Form.Item>
              )
            }
            case "password": {
              return (
                <Form.Item label={`${item.label}`} hasFeedback>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [
                      {
                        required: true,
                        message: `${item.messageNull}`,
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password disabled={item.disabled} />)}
                </Form.Item>
              )
            }
            case "confirm":
              return (
                <Form.Item label={`${item.label}`} hasFeedback>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [
                      {
                        required: true,
                        message: `${item.messageNull}`,
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} disabled={item.disabled} />)}
                </Form.Item>
              )
            case "oldPassword":
              return (
                <Form.Item label={`${item.label}`} >
                  {getFieldDecorator(`${item.name}`, {
                    rules: [
                      {
                        required: true,
                        message: `${item.messageNull}`,
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password disabled={item.disabled} />)}
                </Form.Item>
              )
            case "phone":
              return (
                <Form.Item label={`${item.label}`}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                  })(<Input />)}
                </Form.Item>
              )
            case "text":
              return (
                <Form.Item label={`${item.label}`}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                  })(<Input />)}
                </Form.Item>
              )

          }
          break;
        case "select":
          return (
            <Form.Item label={`${item.label}`}>
              {getFieldDecorator(`${item.name}`, {
                rules: [{ required: true, message: `${item.messageNull}` }],
              })(
                <Select placeholder={`${item.messageNull}`} >
                  {this.optionSelect(item.option)}
                </Select>,
              )}
            </Form.Item>
          )
        case "inputArray":
          switch (item.typeInput) {
            case "checkbox":
              return (
                <Form.Item label={`${item.label}`}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{
                      required: true,
                      message: `${item.messageNull}`
                    }],
                    initialValue: []
                  })(
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row>
                        {this.checkboxItem(item.option)}
                      </Row>
                    </Checkbox.Group>,
                  )}
                </Form.Item>
              )
            case "text":
              return (
                < Form.Item label={`${item.label}`}
                  {...tailFormItemLayout}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [
                      {
                        required: true,
                        message: `${item.messageNull}`,
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<div>
                    {this.showInputAdd(item.name)}
                    <Button type="dashed" onClick={() => this.addInput(item.name)} style={{ width: '100%' }}>
                      <Icon type="plus" /> Thêm trường
                    </Button>
                  </div>)}
                </Form.Item >
              )
          }
      }
    });
    return mapForm;
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Drawer
        title={`${this.props.field.title}`}
        placement="right"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.addShow}
        width={820}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {this.addForm(getFieldDecorator, tailFormItemLayout)}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={this.props.onClose}>
              {this.props.field.submitName}
            </Button>
            <Button className="cancel-button" type="primary" onClick={this.props.onClose}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default Form.create()(Forms);