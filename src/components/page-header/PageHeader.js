import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './page-header.less';
let routes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
    {
      path: 'first',
      breadcrumbName: 'chart',
    },
    {
      path: 'second',
      breadcrumbName: 'chart content',
    },
  ];

class PageHeaders extends Component {

  getTime=()=>{
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let time = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    return time;
  }

    render() {
        return (
            <div className="page-header">
              <div className="page-header-left">
                  {routes[0].breadcrumbName+" / "+routes[1].breadcrumbName+" / "+routes[2].breadcrumbName}
              </div>
              <div className="page-header-right">
                {this.getTime()}
              </div>
            </div>
        );
    }
}

export default PageHeaders;