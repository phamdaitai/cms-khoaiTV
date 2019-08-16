import React, { Component } from 'react';
import './style.less';
import userData from '../../data/user.json';
import Filter from '../Filter';
import Add from '../Add';
import Tables from '../Table';
import userFields from '../../data/userFields.json';

//read field
const filterField = userFields.filterField;
const tableTitle = userFields.tableTitle;
const addField = userFields.addField;
const editField = userFields.editField;

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDataState: userData,
      currentPage: 1,
      isShowMenu: false,
      dataFilter: {}
    }
  }

  getDataFilter = (dataFilter) => {
    this.setState({ dataFilter: dataFilter });
  }

  getDataForm = (dataNewUser) => {
    var d = Date.now();
    dataNewUser.dateRegistered = d;
    console.log("Gia tri form User:", dataNewUser);
    let tempData = this.state.userDataState;
    tempData.unshift(dataNewUser);
    this.setState({
      userDataState: tempData
    })
  }

  getEdit = (dataEdit) => {
    console.log("User data edit: ", dataEdit);
    let tempData = this.state.userDataState;
    tempData = tempData.map((item) => {
      if (item._id !== dataEdit._id) {
        return item;
      }
      else {
        item.name = dataEdit.name;
        item.password = dataEdit.password;
        return item;
      }
    });
    this.setState({
      userDataState: tempData
    })
  }

  getDelete = (idDelete) => {
    let tempData = this.state.userDataState;
    tempData = tempData.filter((item) => (item._id !== idDelete));
    this.setState({
      userDataState: tempData
    })
  }

  render() {
    return (
      <div className="content-main">
        <Filter
          filterProps={filterField}
          getDataFilter={(dataFilter) => this.getDataFilter(dataFilter)}
        />
        <Add
          addField={addField}
          getDataForm={(dataNewUser) => this.getDataForm(dataNewUser)}
        />
        <Tables
          titleTableProps={tableTitle}
          dataTableProps={this.state.userDataState}
          dataFilter={this.state.dataFilter}
          editField={editField}
          getEdit={(dataEdit) => this.getEdit(dataEdit)}
          getDelete={(idDelete) => this.getDelete(idDelete)}
        />
      </div>
    );
  }
}

export default User;