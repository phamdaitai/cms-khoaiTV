import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './path-header.less';

class PathHeaders extends Component {

  render() {
    let { breadcrumb } = this.props;
    let mapBreadcumb = breadcrumb.map((val) => {
      return (
        <Link to={`${val.path}/`}>&nbsp; / &nbsp;<Icon type={val.typeIcon} />&nbsp;{val.path}</Link>
      )
    })
    console.log(breadcrumb);
    return (
      <div className="path-header">
        <div className="path-header-left">
          <Link to={`/`}> <Icon type='home' /> &nbsp; Home </Link>
          {mapBreadcumb}
        </div>
        <div className="path-header-right">
        </div>
      </div>
    );
  }
}

export default PathHeaders;