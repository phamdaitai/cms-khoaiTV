import React, { Component } from 'react';
import Forms from '../../pages/Form/index';
import userFields from '../../data/userFields.json';
import * as constant from '../../utils/constants';
import axios from 'axios';

//read field
const addField = userFields.addField;

class Register extends Component {

  getForm = (dataNewUser) => {
    console.log("Gia tri form đăng ký:", dataNewUser);
    if (dataNewUser !== {}) {
      axios({
        method: 'POST',
        url: `${constant.BASEURL}/users/register`,
        data: { dataNewUser }
      })
        .then(res => {
          if (res.data) {

          }
        })
      this.props.otpActivate(true);
    }
  }

  render() {
    return (
      <Forms
        addShow={this.props.addShow}
        onClose={this.props.onClose}
        field={addField}
        getDataForm={(dataForm) => this.getForm(dataForm)}
      />
    );
  }
}

export default Register;