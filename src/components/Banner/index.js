import React, { Component } from 'react';
import './style.less';
import bannerFields from '../../data/bannerFields';
import axios from 'axios';
import Add from '../Add/index';
import Table from '../Table/index';


//field
const tableTitle = bannerFields.tableTitle;
const editField = bannerFields.editField;
const addField = editField;

class Banners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: []
    }
  }


  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://123.30.235.196:5221/api/banners'
    })
      .then(res => {
        this.setState({
          banners: res.data.banners
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getDelete = (idDelete) => {
    let tempData = this.state.banners;
    tempData = tempData.filter((item) => (item._id !== idDelete));
    this.setState({
      banners: tempData
    })
  }

  getDataForm = (dataNewBanner) => {
    console.log(dataNewBanner);
    let tempData = this.state.banners;
    tempData.unshift(dataNewBanner);
    this.setState({
      banners: tempData
    })
  }

  getIdEdit = (idEdit) => {
    console.log('idEdit:', idEdit);
  }


  getEdit = (dataEdit) => {
    let tempData = this.state.banners;
    tempData = tempData.map((item) => {
      if (item._id !== dataEdit._id) {
        return item;
      }
      else {
        item.image = dataEdit.image;
        item.action = dataEdit.action;
        item.payload = dataEdit.payload;
        return item;
      }
    });
    this.setState({
      banners: tempData
    })
  }

  render() {
    return (
      <div>
        <Add
          addField={addField}
          getDataForm={(dataNewBanner) => this.getDataForm(dataNewBanner)}
        />
        <Table
          titleTableProps={tableTitle}
          dataTableProps={this.state.banners}
          editField={editField}
          getIdEdit={(idEdit) => this.getIdEdit(idEdit)}
          getEdit={(dataEdit) => this.getEdit(dataEdit)}
          getDelete={(idDelete) => this.getDelete(idDelete)}
        />
      </div>
    );
  }
}

export default Banners;