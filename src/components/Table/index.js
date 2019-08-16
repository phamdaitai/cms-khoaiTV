/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import './style.less';
import TableDetail from '../../pages/TableDetail/index';
import { Pagination } from 'antd';

const recordPerPage = 5;

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    setDataTable = (dataTable) => {
        let mapData = dataTable.map((value, key) => {
            return (
                <TableDetail
                    value={value} key={key} index={key}
                    deleteElement={() => this.deleteElement(value._id)}
                    titleTableProps={this.props.titleTableProps}
                    editField={this.props.editField}
                    getEdit={(dataEdit) => this.props.getEdit(dataEdit)}
                    getDelete={(idDelete) => this.props.getDelete(idDelete)}
                />
            )
        });

        let { currentPage } = this.state;
        const current = currentPage;
        const indexOfFirstTodo = current * recordPerPage - recordPerPage; //phan trang
        const indexOfLastTodo = current * recordPerPage;

        if (dataTable.length !== 0 && indexOfFirstTodo === dataTable.length) {
            this.setState({ currentPage: currentPage - 1 });
        }

        const currentTodos = mapData.slice(indexOfFirstTodo, indexOfLastTodo);

        return currentTodos;
    }

    pageIndex = (page) => {
        this.setState({
            currentPage: page
        })
    }

    tableTitle = () => {
        let { titleTableProps } = this.props;
        let tableTitle = [];
        if (titleTableProps) {
            tableTitle = Object.values(titleTableProps);
            tableTitle = tableTitle.map((title, index) => { return (<th key={index}>{title}</th>) });
        }
        return tableTitle;
    }

    filter = (data) => {
        let { dataFilter } = this.props;
        let dataFilterTemp = data.filter((item) => {

            let checkFilter = true;
            for (let key in dataFilter) {
                if (typeof item[key] === String || typeof item[key] === 'string') {
                    if (item[key].toLowerCase().indexOf(dataFilter[key]) !== -1) {
                        //checkFilter = true;
                    }
                    else checkFilter = false;
                }
                else {
                    if (item[key] === dataFilter[key]) {
                        //checkFilter = true;
                    } else checkFilter = false;
                }
            }

            if (checkFilter) {
                return item;
            }
            else if (dataFilter.name === undefined) return item; //begin load
        });
        return dataFilterTemp;
    }

    render() {
        let { dataTableProps } = this.props;
        let data = this.filter(dataTableProps);

        return (
            <div className="content-main">
                <table className="table-user table">
                    <thead>
                        <tr>
                            {this.tableTitle()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.setDataTable(data)}
                    </tbody>
                </table>
                <Pagination className="pagination" defaultCurrent={1} current={this.state.currentPage} pageSize={recordPerPage}
                    /*total={this.state.DataState.length}*/ total={data.length}
                    onChange={(page, pageSize) => this.pageIndex(page, pageSize)} />
            </div>
        );
    }
}

export default Tables;