/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
import React, { Component } from 'react';
import { Popconfirm, message, Icon } from 'antd';
import Forms from '../../pages/Form/index';
import './style.less';
import '../../components/Table/style.less';

class TableDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addShow: false,
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

    handleOk = e => {
        this.setState({
            editState: false
        });
        this.saveEdit();
    };

    handleCancel = e => {
        this.setState({
            editState: false
        });
    };

    changeStateActivated = () => {
        let { activated } = this.state;
        this.setState({
            activated: !activated
        })
    }

    confirm = () => {
        this.props.getDelete(this.props.value._id);
        message.info('Xóa thành công!');
    }

    showTableElement = () => {
        let { titleTableProps, index, value } = this.props;

        let dataElementShow = [];

        for (let key in titleTableProps) {
            switch (key) {
                case 'stt':
                    dataElementShow.push(<td key={key} className="td-center">{index + 1}</td>)
                    break;
                case 'name':
                    dataElementShow.push(<td key={key}>
                        <a onClick={this.showDrawer}
                            style={{ textDecoration: "none" }}>{value.name}</a>
                        <Forms
                            field={this.props.editField}
                            getDataForm={(dataEdit) => this.getEdit(dataEdit)}
                            addShow={this.state.addShow}
                            onClose={this.onClose}
                            element={value}
                        />
                    </td>)
                    break;
                case 'email':
                    dataElementShow.push(<td key={key}>{value.email}</td>);
                    break;
                case 'phone':
                    dataElementShow.push(<td key={key} className="td-center">{value.phone}</td>)
                    break;
                case 'actType':
                    let accT = ["Quản trị viên", "Tài khoản thường", "Tài khoản VIP"];
                    dataElementShow.push(<td key={key}>{accT[value.accType]}</td>);
                    break;
                case 'dateRegistered':
                    let date = new Date(value.dateRegistered);
                    date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
                    dataElementShow.push(<td key={key}>{date}</td>);
                    break;
                case 'image':
                    dataElementShow.push(
                        <td className="td-center" key={key}>
                            <img src={value.image} alt={value.title.title_vn} style={{ width: 60, height: 30 }} />
                        </td>
                    );
                    break;
                case 'title':
                    dataElementShow.push(
                        <td key={key}>
                            <a onClick={this.showEditBlock} style={{ textDecoration: "none" }}>{value.title.title_vn}</a>
                        </td>
                    );
                    break;
                case 'dateReleased':
                    let dateReleased = value.dateReleased;
                    let dateReleasedFormat = dateReleased.slice(8, 10) + "-" +
                        dateReleased.slice(5, 7) + "-" + dateReleased.slice(0, 4);
                    dataElementShow.push(
                        <td className="td-center" key={key}>{dateReleasedFormat}</td>
                    );
                    break;
                case 'country':
                    dataElementShow.push(
                        <td style={{ textTransform: "capitalize" }} key={key}>{value.country}</td>
                    );
                    break;
                case 'imdb':
                    dataElementShow.push(
                        <td className="td-center" key={key}>{value.imdb}</td>
                    );
                    break;
                case 'views':
                    dataElementShow.push(
                        <td className="td-center" key={key}>{value.views}</td>
                    );
                    break;
                case 'activated':
                    let activatedTemp = value.activated ? 1 : 0;
                    let activatedTempClass = ["checkbox-none", "checkbox-selected"];
                    dataElementShow.push(
                        <td key={key} className="td-center">
                            <span className={`${activatedTempClass[activatedTemp]} icon-state`}
                                onClick={this.changeActivated}></span>
                        </td>)
                    break;
                case 'action':
                    dataElementShow.push(
                        <td key={key} className="td-center action-button"
                            style={{ display: 'flex', justifyContent: 'center' }}>
                            <Popconfirm
                                placement="topRight"
                                title="Bạn có chắc chắn xóa không?"
                                onConfirm={this.confirm}
                                okText="Đồng ý"
                                cancelText="Hủy">
                                <button className="delete-button button">
                                    <Icon type="close-circle" className="delete-icon icon-action" />
                                </button>
                            </Popconfirm>
                        </td>
                    )
                    break;

            }
        }
        return dataElementShow;
    }

    getEdit = (dataEdit) => {
        dataEdit._id = this.props.value._id;
        this.props.getEdit(dataEdit);
    }

    render() {

        return (
            <tr>
                {this.showTableElement()}
            </tr>
        );
    }
}

export default TableDetail;