import React, { Component } from 'react';


export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }


  render() {
    return (
      <div className="example-nav">
        <div className="nav-btn">
          <a href="https://github.com/cbbfcd/wukong.git">Start</a>
        </div>
        <div className="nav-btn">
          <a href="https://github.com/cbbfcd/wukong/blob/master/docs/doc.mdown">Document</a>
        </div>
        <div className="nav-btn">
          <a>Example</a>
        </div>
      </div>
    );
  }
}
