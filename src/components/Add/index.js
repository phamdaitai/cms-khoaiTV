import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.less';
import Forms from '../../pages/Form';

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addShow: false
        }
    }

    showDrawer = () => {
        this.setState({
            addShow: true,
        });
    };

    onClose = () => {
        this.setState({
            addShow: false,
        });
    };

    render() {
        return (
            <div className="add-field">
                <span className="add-field-show" onClick={this.showDrawer}>
                    <Icon className="add-field-icon" type="plus" />
                    <span>Thêm mới</span>
                </span>
                <Forms
                    addShow={this.state.addShow}
                    onClose={this.onClose}
                    field={this.props.addField}
                    getDataForm={(dataForm) => this.props.getDataForm(dataForm)}
                />
            </div>
        );
    }
}

export default Add;