import React, { Component } from 'react';
import axios from 'axios';
import Filter from '../Filter';
import Add from '../Add';
import Tables from '../Table';
import filmFields from '../../data/filmFields';

//read field
const filterField = filmFields.filterField;
const tableTitle = filmFields.tableTitle;
const addField = filmFields.addField;
const editField = filmFields.editField;

class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            dataFilter: {}
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: 'http://123.30.235.196:5221/api/films'
        }).then(res => {
            this.setState({
                films: res.data.films
            })

        }).catch(error => {
            console.log(error);
        });
    }

    getDataFilter = (dataFilter) => {
        this.setState({ dataFilter: dataFilter });
    }

    getDataForm = (dataNewFilm) => {
        console.log("Gia tri form Film:", dataNewFilm);
        let tempData = this.state.films;
        tempData.unshift(dataNewFilm);
        this.setState({
            films: tempData
        })
    }

    getEdit = (dataEdit) => {
        console.log("Film data edit: ", dataEdit);
        let tempData = this.state.films;
        tempData = tempData.map((item) => {
            if (item._id !== dataEdit._id) {
                return item;
            }
            else {
                for (let key in dataEdit) {
                    if (key !== 'links') {
                        item[key] = dataEdit[key];
                    }
                }
                return item;
            }
        });
        this.setState({
            films: tempData
        })
    }

    getDelete = (idDelete) => {
        let tempData = this.state.films;
        tempData = tempData.filter((item) => (item._id !== idDelete));
        this.setState({
            films: tempData
        })
    }

    render() {
        return (
            <div>
                <Filter
                    filterProps={filterField}
                    getDataFilter={(dataFilter) => this.getDataFilter(dataFilter)}
                />
                <Add
                    addField={addField}
                    getDataForm={(dataNewFilm) => this.getDataForm(dataNewFilm)}
                />
                <Tables
                    titleTableProps={tableTitle}
                    dataTableProps={this.state.films}
                    dataFilter={this.state.dataFilter}
                    editField={editField}
                    getEdit={(dataEdit) => this.getEdit(dataEdit)}
                    getDelete={(idDelete) => this.getDelete(idDelete)}
                />
            </div>
        );
    }
}


export default Films;