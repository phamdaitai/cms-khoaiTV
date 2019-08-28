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
                    getIdEdit={(idEdit) => this.props.getIdEdit(idEdit)}
                    editField={this.props.editField}
                    getEdit={(dataEdit) => this.props.getEdit(dataEdit)}
                    getDelete={(idDelete) => this.props.getDelete(idDelete)}
                    getChangeActivated={(idChange) => this.props.getChangeActivated(idChange)}
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
                if (key === 'year') {
                    let filterKey = dataFilter[key].toString();
                    filterKey = filterKey.slice(0, 4);
                    let yearReleased = item['dateReleased'].slice(0, 4);
                    if (filterKey !== yearReleased) {
                        checkFilter = false;
                    }
                }
                else if (key === 'arrange') {
                }
                else if (typeof item[key] === String || typeof item[key] === 'string') {
                    if (item[key].toLowerCase().indexOf(dataFilter[key]) !== -1) {
                        //checkFilter = true;
                    }
                    else checkFilter = false;
                }
                else if (typeof item[key] === Array) {
                    let tempBoolean = false;
                    for (let val of item[key]) {
                        if (val.toLowerCase() === dataFilter[key]) {
                            tempBoolean = true;
                        }
                    }
                    if (checkFilter === true) {
                        checkFilter = tempBoolean;
                    }
                }
                else if (typeof item[key] === Object || typeof item[key] === 'object') {
                    let tempBoolean = false;
                    let temp = item[key];
                    for (let key2 in temp) {
                        if (temp[key2].toLowerCase() === dataFilter[key]) {
                            tempBoolean = true;
                        }
                    }
                    if (checkFilter === true) {
                        checkFilter = tempBoolean;
                    }
                }
                else {
                    if (item[key] !== dataFilter[key]) {
                        checkFilter = false;
                    }
                }
            }

            if (checkFilter === true) {
                return item;
            }
            //else if (dataFilter.name === null) return item; //begin load
        });

        if (dataFilter.arrange) {
            const tempArrange = ['dateUpdated', 'dateReleased', 'title_vn', 'imdb', 'views', 'ratingNumber'];
            let tempName = tempArrange[dataFilter.arrange];

            let temp = [];
            if (tempName === 'imdb' || tempName === 'views' || tempName === 'ratingNumber') {
                if (dataFilterTemp) {
                    temp = dataFilterTemp.sort((a, b) => {
                        return b[tempName] - a[tempName];
                    });
                } else {
                    temp = data.sort((a, b) => {
                        return b[tempName] - a[tempName];
                    });
                }
            }
            if (tempName === 'title_vn') {
                if (dataFilterTemp) {
                    temp = dataFilterTemp.sort((a, b) => {
                        return a.title[tempName].charCodeAt() - b.title[tempName].charCodeAt();
                    });
                } else {
                    temp = data.sort((a, b) => {
                        return a.title[tempName].charCodeAt() - b.title[tempName].charCodeAt();
                    });
                }
            }
            if (tempName === 'dateUpdated' || tempName === 'dateReleased') {
                if (dataFilterTemp) {
                    temp = dataFilterTemp.sort((a, b) => {
                        let tempYearA = a[tempName].slice(0, 4);
                        let tempYearB = b[tempName].slice(0, 4);
                        let tempMonthA = a[tempName].slice(5, 7);
                        let tempMonthB = b[tempName].slice(5, 7);
                        let tempDayA = a[tempName].slice(8, 10);
                        let tempDayB = b[tempName].slice(8, 10);
                        return 365 * (parseInt(tempYearB) - parseInt(tempYearA))
                            + 12 * (parseInt(tempMonthB) - parseInt(tempMonthA))
                            + (parseInt(tempDayB) - parseInt(tempDayA));
                    });
                } else {
                    temp = data.sort((a, b) => {
                        return b[tempName].slice(0, 4).parseInt() - a[tempName].slice(0, 4).parseInt();
                    });
                }
            }

            dataFilterTemp = temp;
        }
        return dataFilterTemp;
    }

    render() {
        let { dataTableProps } = this.props;
        let data = [];
        if (this.props.dataFilter) {
            data = this.filter(dataTableProps);
        }
        else {
            data = dataTableProps;
        }

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