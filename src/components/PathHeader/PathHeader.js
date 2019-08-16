import React, { Component } from 'react';
import './path-header.less';
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

class PathHeaders extends Component {

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
            <div className="path-header">
              <div className="path-header-left">
                  {routes[0].breadcrumbName+" / "+routes[1].breadcrumbName+" / "+routes[2].breadcrumbName}
              </div>
              <div className="path-header-right">
                {/* {this.getTime()} */}
              </div>
            </div>
        );
    }
}

export default PathHeaders;