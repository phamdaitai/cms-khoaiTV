import React, { Component } from 'react';
import './style.less';
import { Input, Icon, Button } from 'antd';
const { TextArea } = Input;

class InputItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numTextArea: [],
      numItem: [],
      dataState: {}
    }
  }

  remove = (itemKey, textKey) => {
    let { numTextArea, dataState } = this.state;
    let tempData = {};
    for (let i = 0; i < numTextArea.length; i++) {
      if (numTextArea[i].key === itemKey) {
        numTextArea[i].values = numTextArea[i].values.filter(val => val !== textKey);
      }
    }
    for (let key in dataState) {
      if (key === `item${itemKey}textArea${textKey}`) {
        dataState[key] = undefined;
        this.props.removeText({ name: key });
      }
    }
    for (let key in dataState) {
      if (dataState[key]) {
        tempData[key] = dataState[key];
      }
    }

    this.setState({
      numTextArea: numTextArea,
      dataState: tempData
    })
  }

  showText = (itemKey) => {
    const { numTextArea } = this.state;
    let stateElement = [];
    for (let val of numTextArea) {
      if (val.key === itemKey) {
        stateElement = val.values;
      }
    }
    let formTextArea = stateElement.map((k, index) => {
      return (
        <div className='text-area-block'>
          <TextArea className='text-area-add' name={`item${itemKey}textArea${k}`}
            value={this.state.dataState[`item${itemKey}textArea${k}`]}
            placeholder='Nhập vào nội dung'
            key={`item${itemKey}textArea${k}`} onChange={(e) => this.isChange(e)} />
          <div className='text-area-button'>
            <Icon type="minus-circle-o" className='minus-circle-o' onClick={() => this.remove(itemKey, k)} />
            <Icon type="plus-circle-o" className='plus-circle-o' onClick={() => this.addText(itemKey, k)} />
          </div>
        </div>
      )
    })
    return formTextArea;
  }

  addText = (itemKey, prevKey) => {
    let { numTextArea } = this.state;
    let checkNull = false;
    if (numTextArea.length === 0) {
      numTextArea.push({ key: itemKey, values: [0] });
    } else {
      numTextArea = numTextArea.map((val) => {
        if (val.key === itemKey) {
          checkNull = true;
          val.values.splice(val.values.indexOf(prevKey) + 1, 0, Math.max(...val.values) + 1);
          return { key: val.key, values: val.values };
        }
        else return val;
      })

      if (!checkNull || prevKey === -1) {
        numTextArea.push({ key: itemKey, values: [0] });
      }
    }
    this.setState({ numTextArea: numTextArea });
  }

  isChange = (e) => {
    let { dataState } = this.state;
    let { numItem } = this.state;
    let name = e.target.name;
    let value = e.target.value;
    dataState[name] = value;

    this.props.getItemForm({ numItem, name, value });

    this.setState({
      dataState
    })
  }

  showStyleInput = (itemKey) => {
    let { numTextArea } = this.state;
    let checkNullValues = 0;
    for (let val of numTextArea) {
      if (numTextArea.length === 0) {
        checkNullValues = 0;
      }
      else if (val.key === itemKey) {
        checkNullValues = val.values.length;
      }
    }
    if (checkNullValues === 0) {
      return (
        <div className='text-input-block'>
          <Input className='input-add-text-area'
            placeholder="Nhập vào tiêu đề"
            value={this.state.dataState[`item${itemKey}input`] || ''}
            name={`item${itemKey}input`} onChange={(e) => this.isChange(e)} />
          <div className='text-input-button'>
            <Icon type="plus-circle-o" className='plus-circle-o' onClick={() => this.addText(itemKey, -1)} />
          </div>
        </div>
      )
    }
    else {
      return (
        <Input name={`item${itemKey}input`}
          placeholder="Nhập vào tiêu đề"
          value={this.state.dataState[`item${itemKey}input`] || ''}
          onChange={(e) => this.isChange(e)} />
      )
    }
  }

  addItem = (prevKey) => {
    let { numItem } = this.state;

    if (!numItem.length) {
      numItem.push(0);
      this.setState({
        numItem: numItem
      })
    } else {
      numItem.splice(numItem.indexOf(prevKey) + 1, 0, Math.max(...numItem) + 1);
      this.setState({
        numItem: numItem
      })
    }
  }

  removeItem = (key) => {
    let { numItem, numTextArea, dataState } = this.state;
    numItem = numItem.filter(val => val !== key);
    numTextArea = numTextArea.filter(val => val.key !== key);
    for (let k in dataState) {
      if (k.indexOf(`item${key}textArea`) !== -1) {
        dataState[k] = undefined;
        this.props.removeItem({ key, name: k });
      }
      else if (k.indexOf(`item${key}input`) !== -1) {
        dataState[k] = undefined;
        this.props.removeItem({ key, name: k });
      }
    }

    let temData = {};
    for (let k in dataState) {
      if (dataState[k]) {
        temData[k] = dataState[k];
      }
    }

    this.setState({
      numItem: numItem,
      numTextArea: numTextArea,
      dataState: temData
    });
  }

  showItem = () => {
    let { numItem } = this.state;
    const itemShow = numItem.map((k, index) => {
      return (
        <div>
          {this.showStyleInput(k)}
          {this.showText(k)}
          <Button className='btn-delete-item' onClick={() => this.removeItem(k)}>
            <span>Xóa Item</span>
          </Button>
          <Button className='btn-add-item' onClick={() => this.addItem(k)}>
            <span>Thêm Item</span>
          </Button>
        </div>
      )
    })
    return itemShow;
  }

  showAddItemButton = () => {
    let { numItem } = this.state;
    if (numItem.length === 0) {
      return (
        <Button type="dashed" onClick={() => this.addItem(-1)} style={{ width: "100%" }}>
          <Icon type="plus" /> Thêm Item
        </Button>
      )
    }
    else {
      return null;
    }
  }

  componentDidMount() {
    let { values } = this.props.valueProps;
    if (values) {
      let numItem = [];
      let numTextArea = [];
      let dataState = {};

      for (let i = 0; i < values.length; i++) {
        numItem.push(i);
        dataState[`item${i}input`] = values[i].title;
        let tempText = { key: i, values: [] };
        for (let j = 0; j < values[i].paragraphs.length; j++) {
          tempText.values.push(j);
          dataState[`item${i}textArea${j}`] = values[i].paragraphs[j];
        }
        numTextArea.push(tempText);
      }

      this.props.initItemForm({ numItem, dataState });
      this.setState({
        numItem,
        numTextArea,
        dataState
      })
    }
  }

  render() {

    return (
      <div>
        {this.showItem()}
        {this.showAddItemButton()}
      </div>
    );
  }
}

export default InputItem;