/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import React, { Component } from 'react';
import './style.less';
import { Icon, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  optionSelect = (option) => {
    let optionSelect = option.map((value, index) => {
      return (
        <Option value={value} key={index}>{value}</Option>
      )
    });
    return optionSelect;
  }


  getTime = () => {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let time = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    return time;
  }

  isChange = (value, name) => {
    this.setState({
      [name]: value
    });
  }

  isChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  submitInput = () => {
    let { getDataFilter, dataFilter } = this.props;
    dataFilter = this.state;
    let dataFilterLower = {};
    for (let key in dataFilter) {
      if (typeof dataFilter[key] === String || typeof dataFilter[key] === 'string') {
        dataFilterLower[key] = dataFilter[key].toLowerCase();//chuyen fileter ve lower string
      } else {
        dataFilterLower[key] = dataFilter[key];
      }
    }
    getDataFilter(dataFilterLower);
    for (let key in dataFilter) {
      this.setState({
        [key]: undefined
      })
    }
  }

  mapFilter = (filterProps) => {
    let mapFilter = filterProps.map((value, index) => {
      switch (value.type) {
        case "select":
          return (
            <div className="filter-type" key={value.name}>
              {/* <label htmlFor="fname">{value.title}</label> */}
              <Select
                className={`type-${value.type} filter-element`}
                defaultValue={value.title}
                name={value.name}
                onChange={(checked, name) => this.isChange(checked, value.name)}>
                {this.optionSelect(value.option)}
              </Select>
            </div>
          );
        case "input":
          switch (value.typeInput) {
            case "text":
              return (
                <div className="filter-type" key={value.name}>
                  <label htmlFor="fname">{value.title}</label>
                  <Input
                    name={value.name}
                    value={this.state[`${value.name}`]}
                    className={`type-${value.type} filter-element`}
                    type={value.typeInput}
                    placeholder={value.placeholder}
                    onChange={(event) => this.isChangeInput(event)}
                  />
                </div>
              );
            case "number":
              let { min, max } = value.limited;
              return (
                <div className="filter-type" key={value.name}>
                  <label htmlFor="fname">{value.title}</label>
                  <InputNumber className={`type-${value.type} filter-element`}
                    type={value.typeInput}
                    min={min}
                    max={max}
                    defaultValue={Math.round((min + max) / 2)} />
                </div>
              )
            default:
              return (
                <div className="filter-type">
                  <label htmlFor="fname">{value.title}</label>
                  <input className={`type-${value.type} filter-element`} type={value.typeInput} />
                </div>
              );

          }
      }
    })

    if (mapFilter.length !== 0) {
      mapFilter.push(
        <div key={mapFilter.length + 1} onClick={() => this.submitInput()} className="filter-type">
          <span className="submit-filter">
            <Icon className="submit-filter-icon" type="filter" />
            <span>Lọc</span>
          </span>
        </div>
      );
    }
    return mapFilter;
  }


  render() {
    let { filterProps } = this.props;
    return (
      <div className="filter">
        <div className="filter-left">
          <form className="filter-form">
            {this.mapFilter(filterProps)}
          </form>
        </div>
        <div className="filter-right">
          {this.getTime()}
        </div>
      </div>
    );
  }
}

export default Filter;