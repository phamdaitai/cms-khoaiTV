/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import React, { Component } from 'react';
import {
  Drawer, Form, Input, Tooltip, Icon, Select, Button, Checkbox, Radio,
  Row, Col, Tag, DatePicker
} from 'antd';
import './style.less';
import 'antd/dist/antd.css';
import InputItem from '../InputItem';
const { Option } = Select;
const { TextArea } = Input;

class Forms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      //values: []
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);

        let stateField = this.state;
        for (let key in stateField) {
          let tagsEquals = key.slice(0, 4);
          if (tagsEquals === 'tags') {
            let name = key.slice(4);
            values[name] = stateField[key];
          }
        }

        let { dataState, numItem } = this.state;
        if (dataState !== undefined) {
          let valueData = [];
          for (let numKey of numItem) {
            let value = { title: '', paragraphs: [] };
            for (let k in dataState) {
              if (k.indexOf(`item${numKey}`) !== -1) {
                if (k === `item${numKey}input`) {
                  value.title = dataState[k];
                }
                else if (k.indexOf(`item${numKey}textArea`) !== -1) {
                  if (dataState[k] !== '') {
                    value.paragraphs.push(dataState[k])
                  };
                }
              }
            }
            if (value.paragraphs.length !== 0 || value.title !== '') {
              valueData.push(value);
            }
          }
          values['values'] = valueData;
        }

        const dataTemp = {
          Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
          Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: 11, Dec: '12'
        }

        let valuesTemp = {};
        for (let key in values) {
          let dateSlice = key.slice(0, 4);
          if (key !== "confirm" && key !== "title_vn" && key !== "title_en"
            && dateSlice !== 'date' && key !== 'titleBanner' && key !== "titleChildrens"
            && key !== "titleParent" && key !== "typeCategoryChildren" && key !== "typeCategoryParent") {
            valuesTemp[key] = values[key];
          }
          else if (key === 'title_vn') {
            let titleTemp = {};
            titleTemp['title_vn'] = values['title_vn'];
            titleTemp['title_en'] = values['title_en'];
            valuesTemp['title'] = titleTemp;
          }
          else if (key === 'titleBanner') {
            let payloadTemp = {};
            payloadTemp['title'] = values['titleBanner'];
            valuesTemp['payload'] = payloadTemp;
          }
          else if (key === "titleParent") {
            let parentCategory = {};
            let childrenCategories = {};
            parentCategory['title'] = values['titleParent'];
            parentCategory['typeCategory'] = values['typeCategoryParent'];
            childrenCategories['titles'] = values['titleChildrens'];
            childrenCategories['typeCategory'] = values['typeCategoryChildren'];
            valuesTemp['parentCategory'] = parentCategory;
            valuesTemp['childrenCategories'] = childrenCategories;
          }
          else if (dateSlice === 'date') {
            let temp = values[key]._d;
            temp = temp.toString();
            let y = temp.slice(11, 15);
            let m = temp.slice(4, 7);
            let d = temp.slice(8, 10);
            valuesTemp[key] = y + '-' + dataTemp[m] + '-' + d;
          }
        }
        console.log("VALUES: ", valuesTemp);
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
        <Col span={8} key={index}>
          <Checkbox value={item.value} disabled={item.disabled}>{item.value}</Checkbox>
        </Col>
      )
    })
    return mapCheckbox;
  }

  radioItem = (option) => {
    let mapRadio = option.map((value, index) => {
      return (
        <Col span={8} key={index}>
          <Radio value={value}>{value}</Radio>
        </Col>
      )
    })
    return mapRadio;
  }

  addInput = (name) => {
    if (this.state[name] === undefined) {
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
    for (let i = 0; i < this.state[name + 'State']; i++) {
      quantityInput.push(
        <div>
          <Input
            key={i}
            style={{ width: '90%', float: "left" }}
            name={`${name}[]`}
            onChange={(event) => this.changeInput(event)}
            className={`inputarray-${name}`}
          />
          <Icon type="minus-circle" style={{ cursor: "pointer" }}
            onClick={() => this.subInput(`${name}State`)} />
        </div>
      )
    }
    return quantityInput;
  }

  //TAGS
  initState = (name, values) => {
    this.setState({
      ['tags' + name]: values || [],
      ['inputVisible' + name]: false,
      ['inputValue' + name]: ''
    });
  }

  handleClose = (removedTag, name) => {
    let tags = this.state['tags' + name];
    tags = tags.filter(tag => tag !== removedTag);
    this.setState({ ['tags' + name]: tags });
  };

  showInput = (name) => {
    this.setState({ ['inputVisible' + name]: true }, () => this.input.focus());
  };

  handleInputChange = (e, name) => {
    this.setState({ ['inputValue' + name]: e.target.value });
  };

  handleInputConfirm = (name) => {
    const inputValue = this.state['inputValue' + name];
    let tags = this.state['tags' + name];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      ['tags' + name]: tags,
      ['inputVisible' + name]: false,
      ['inputValue' + name]: '',
    });
  };

  saveInputRef = input => (this.input = input);

  removeText = (item) => {
    let { dataState } = this.state;
    let tempData = {};

    for (let key in dataState) {
      if (key !== item.name) {
        tempData[key] = dataState[key];
      }
    }
    this.setState({
      dataState: tempData
    });
  }

  removeItem = (item) => {
    let { numItem, dataState } = this.state;
    numItem = numItem.filter(val => val !== item.key);
    dataState[item.name] = undefined;

    let temData = {};
    for (let k in dataState) {
      if (dataState[k]) {
        temData[k] = dataState[k];
      }
    }
    this.setState({
      numItem: numItem,
      dataState: temData
    })

  }

  initItemForm = (item) => {
    this.setState({
      dataState: item.dataState,
      numItem: item.numItem
    })
  }

  getItemForm = (item) => {
    let { dataState } = this.state;
    if (dataState === undefined) {
      let dataState = {};
      dataState[item.name] = item.value;
      this.setState({
        dataState,
        numItem: item.numItem
      })
    }
    else {
      dataState[item.name] = item.value;
      this.setState({
        dataState,
        numItem: item.numItem
      })
    }
  }

  addForm = (getFieldDecorator, tailFormItemLayout) => {
    let { field } = this.props.field;
    let { valueProps = {} } = this.props;
    let { title = {} } = valueProps;
    let { payload = {} } = valueProps;
    let { parentCategory = {} } = valueProps;
    let { childrenCategories = {} } = valueProps;
    let mapForm = field.map((item, index) => {
      switch (item.type) {
        case "input":
          switch (item.typeInput) {
            case "email": {
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
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
                    ], initialValue: `${valueProps.email || ''}`,
                  })(<Input disabled={item.disabled} />)}
                </Form.Item>
              )
            }
            case "nickName": {
              return (
                <Form.Item key={item.name}
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
                    initialValue: `${valueProps.name || ''}`,
                  })(<Input disabled={item.disabled} />)}
                </Form.Item>
              )
            }
            case "password": {
              return (
                <Form.Item label={`${item.label}`} hasFeedback key={item.name}>
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
                <Form.Item label={`${item.label}`} hasFeedback key={item.name}>
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
                <Form.Item label={`${item.label}`} key={item.name}>
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
                    initialValue: `${valueProps.password || ''}`,
                  })(<Input.Password disabled={item.disabled} />)}
                </Form.Item>
              )
            case "phone":
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                  })(<Input />)}
                </Form.Item>
              )
            case "text":
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                    initialValue: `${valueProps[item.name] || title[item.name] || ''}`
                  })(<Input />)}
                </Form.Item>
              )
            case "textArea":
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    initialValue: `${valueProps[item.name] || ''}`,
                  })(
                    <TextArea rows={4} />)}
                </Form.Item>
              )
            case 'textPayload':
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                    initialValue: `${payload['title'] || ''}`
                  })(<Input />)}
                </Form.Item>
              )
            case 'textParent':
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{ required: true, message: `${item.messageNull}` }],
                    initialValue: `${parentCategory['title'] || ''}`
                  })(<Input />)}
                </Form.Item>
              )
            case "radio":
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{
                      required: true,
                      message: `${item.messageNull}`
                    }],
                    initialValue: `${valueProps[item.name] || ''}`,
                  })(
                    <Radio.Group>
                      <Row>
                        {this.radioItem(item.option)}
                      </Row>
                    </Radio.Group>
                  )}
                </Form.Item>
              )
            case 'radioParent':
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{
                      required: true,
                      message: `${item.messageNull}`
                    }],
                    initialValue: `${parentCategory['typeCategory'] || ''}`,
                  })(
                    <Radio.Group>
                      <Row>
                        {this.radioItem(item.option)}
                      </Row>
                    </Radio.Group>
                  )}
                </Form.Item>
              )
            case 'radioChildren':
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{
                      required: true,
                      message: `${item.messageNull}`
                    }],
                    initialValue: `${childrenCategories['typeCategory'] || ''}`,
                  })(
                    <Radio.Group>
                      <Row>
                        {this.radioItem(item.option)}
                      </Row>
                    </Radio.Group>
                  )}
                </Form.Item>
              )

            case "inputDynamic":
              return (
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    initialValue: `${valueProps[item.name] || []}`,
                  })(
                    <InputItem
                      valueProps={valueProps}
                      getItemForm={(values) => this.getItemForm(values)}
                      values={this.state.values}
                      removeItem={this.removeItem}
                      removeText={this.removeText}
                      initItemForm={this.initItemForm}
                    />)}
                </Form.Item>
              )
          }
          break;
        case "select":
          return (
            <Form.Item label={`${item.label}`} key={item.name}>
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
                <Form.Item label={`${item.label}`} key={item.name}>
                  {getFieldDecorator(`${item.name}`, {
                    rules: [{
                      required: true,
                      message: `${item.messageNull}`
                    }],
                    initialValue: `${valueProps[item.name] || ''}`,
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
              {
                let tags = this.state['tags' + item.name];
                let inputVisible = this.state['inputVisible' + item.name];
                let inputValue = this.state['inputValue' + item.name];
                if (tags === undefined) {
                  this.initState(item.name, valueProps[item.name]);
                  tags = this.state['tags' + item.name];
                  inputVisible = this.state['inputVisible' + item.name];
                  inputValue = this.state['inputValue' + item.name];
                } else {
                  return (
                    < Form.Item label={`${item.label}`} key={item.name}
                      {...tailFormItemLayout}>
                      {getFieldDecorator(`${item.name}`, {
                        initialValue: `${valueProps[item.name] || ''}`,
                      })(
                        <div>
                          {/* {this.initState(item.name)} */}
                          {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                              <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag, item.name)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                              </Tag>
                            );
                            return isLongTag ? (
                              <Tooltip title={tag} key={tag}>
                                {tagElem}
                              </Tooltip>
                            ) : (
                                tagElem
                              );
                          })}
                          {inputVisible && (
                            <Input
                              ref={this.saveInputRef}
                              type="text"
                              size="medium"
                              style={{ width: 78 }}
                              value={inputValue}
                              onChange={(e) => this.handleInputChange(e, item.name)}
                              onBlur={() => this.handleInputConfirm(item.name)}
                              onPressEnter={() => this.handleInputConfirm(item.name)}
                            />
                          )}
                          {!inputVisible && (
                            <Tag onClick={() => this.showInput(item.name)} style={{ background: '#fff', borderStyle: 'dashed' }}>
                              <Icon type="plus" /> Thêm
                          </Tag>
                          )}
                        </div>
                      )}
                    </Form.Item >
                  )
                }
              }
              break;
            case 'textChildren':
              {
                let tags = this.state['tags' + item.name];
                let inputVisible = this.state['inputVisible' + item.name];
                let inputValue = this.state['inputValue' + item.name];
                if (tags === undefined) {
                  this.initState(item.name, childrenCategories['titles']);
                  tags = this.state['tags' + item.name];
                  inputVisible = this.state['inputVisible' + item.name];
                  inputValue = this.state['inputValue' + item.name];
                } else {
                  return (
                    < Form.Item label={`${item.label}`} key={item.name}
                      {...tailFormItemLayout}>
                      {getFieldDecorator(`${item.name}`, {
                        initialValue: `${childrenCategories[item.name] || ''}`,
                      })(
                        <div>
                          {/* {this.initState(item.name)} */}
                          {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                              <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag, item.name)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                              </Tag>
                            );
                            return isLongTag ? (
                              <Tooltip title={tag} key={tag}>
                                {tagElem}
                              </Tooltip>
                            ) : (
                                tagElem
                              );
                          })}
                          {inputVisible && (
                            <Input
                              ref={this.saveInputRef}
                              type="text"
                              size="medium"
                              style={{ width: 78 }}
                              value={inputValue}
                              onChange={(e) => this.handleInputChange(e, item.name)}
                              onBlur={() => this.handleInputConfirm(item.name)}
                              onPressEnter={() => this.handleInputConfirm(item.name)}
                            />
                          )}
                          {!inputVisible && (
                            <Tag onClick={() => this.showInput(item.name)} style={{ background: '#fff', borderStyle: 'dashed' }}>
                              <Icon type="plus" /> Thêm
                          </Tag>
                          )}
                        </div>
                      )}
                    </Form.Item >
                  )
                }
              }

          }
          break;

        case 'date':
          return (
            <Form.Item label={`${item.label}`} key={item.name}>
              {getFieldDecorator(`${item.name}`
              )(
                <DatePicker />,
              )}
            </Form.Item>
          )
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
          <Form.Item className="submitForm" {...tailFormItemLayout}>
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