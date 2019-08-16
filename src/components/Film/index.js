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

class Film extends Component {
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

    render() {
        console.log(addField);
        return (
            <div>
                <Filter
                    filterProps={filterField}
                    getDataFilter={(dataFilter) => this.getDataFilter(dataFilter)}
                />
                <Add
                    addField={addField}
                />
                <Tables
                    titleTableProps={tableTitle}
                    dataTableProps={this.state.films}
                    dataFilter={this.state.dataFilter}
                />
            </div>
        );
    }
}


export default Film;