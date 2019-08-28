import React, { Component } from 'react';
import axios from 'axios';
import Add from '../Add/index';
import Table from '../Table/index';
import categoryFields from '../../data/categoryFields';


//read field
const tableTitle = categoryFields.tableTitle;
const editField = categoryFields.editField;
let addField = categoryFields.addField;

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: 'http://123.30.235.196:5221/api/categories'
        }).then(res => {
            this.setState({
                categories: res.data.categories
            })

        }).catch(error => {
            console.log(error);
        });
    }

    getDelete = (idDelete) => {
        let tempData = this.state.categories;
        tempData = tempData.filter((item) => (item._id !== idDelete));
        this.setState({
            categories: tempData
        })
    }

    getDataForm = (dataNewCategory) => {
        console.log(dataNewCategory);
        let tempData = this.state.categories;
        tempData.unshift(dataNewCategory);
        this.setState({
            categories: tempData
        })
    }

    getEdit = (dataEdit) => {
        let tempData = this.state.categories;
        tempData = tempData.map((item) => {
            if (item._id !== dataEdit._id) {
                return item;
            }
            else {
                item.parentCategory = dataEdit.parentCategory;
                item.childrenCategories = dataEdit.childrenCategories;
                return item;
            }
        });
        this.setState({
            categories: tempData
        })
    }

    render() {
        let { categories } = this.state;
        let tempParent = [];
        let tempChildren = [];
        for (let key in categories) {
            let tempPushParent = true;
            let tempPushChildren = true;
            for (let val of tempParent) {
                if (val === categories[key].parentCategory.typeCategory) {
                    tempPushParent = false;
                }
                if (val === categories[key].childrenCategories.typeCategory) {
                    tempPushChildren = false;
                }
            }
            if (tempPushParent && categories[key].parentCategory.typeCategory)
                tempParent.push(categories[key].parentCategory.typeCategory);
            if (tempPushChildren && categories[key].childrenCategories.typeCategory)
                tempChildren.push(categories[key].childrenCategories.typeCategory);
        }
        for (let value of editField.field) {
            for (let key in value) {
                if (value[key] === 'typeCategoryParent') {
                    value['option'] = tempParent;
                }
                if (value[key] === 'typeCategoryChildren') {
                    value['option'] = tempChildren;
                }
            }
        }

        return (
            <div>
                <Add
                    addField={addField}
                    getDataForm={(dataNewCategory) => this.getDataForm(dataNewCategory)}
                />
                <Table
                    titleTableProps={tableTitle}
                    dataTableProps={this.state.categories}
                    editField={editField}
                    getEdit={(dataEdit) => this.getEdit(dataEdit)}
                    getDelete={(idDelete) => this.getDelete(idDelete)}
                />
            </div>
        );
    }
}

export default Categories;