import React, { Component } from 'react';
import configFields from '../../data/configFields.json';
import axios from 'axios';
import Add from '../Add/index';
import Table from '../Table/index';

//field
const tableTitle = configFields.tableTitle;
let editField = configFields.editField;
let addField = editField;

class Configs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      editField: editField
    }
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: 'http://123.30.235.196:5221/api/configs'
    })
      .then(res => {
        this.setState({
          configs: res.data.configs
        })
      })
  }

  getDataForm = (dataNewConfig) => {
    console.log(dataNewConfig);
    let tempData = this.state.configs;
    tempData.unshift(dataNewConfig);
    this.setState({
      configs: tempData
    })
  }

  getIdEdit = (idEdit) => {
    //console.log(idEdit);
  }

  getDelete = (idDelete) => {
    let tempData = this.state.configs;
    tempData = tempData.filter((item) => (item._id !== idDelete));
    this.setState({
      configs: tempData
    })
  }

  getEdit = (dataEdit) => {
    let tempData = this.state.configs;
    tempData = tempData.map((item) => {
      if (item._id !== dataEdit._id) {
        return item;
      }
      else {
        item.key = dataEdit.key;
        item.values = dataEdit.values;
        return item;
      }
    });
    this.setState({
      configs: tempData
    })
  }

  render() {

    return (
      <div>
        <Add
          addField={addField}
          getDataForm={(dataNewConfig) => this.getDataForm(dataNewConfig)}
        />
        <Table
          titleTableProps={tableTitle}
          dataTableProps={this.state.configs}
          getIdEdit={(idEdit) => this.getIdEdit(idEdit)}
          editField={this.state.editField}
          getEdit={(dataEdit) => this.getEdit(dataEdit)}
          getDelete={(idDelete) => this.getDelete(idDelete)}
        />
      </div>
    );
  }
}

export default Configs;