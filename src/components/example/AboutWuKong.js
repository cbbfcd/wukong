import React, { Component } from 'react';


export default class AboutWuKong extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }


  render() {
    return (
      <div className="example-body">
        <div className="example-title">
          <h1>WelCome to WuKong</h1>
          <h3>a more simple react boilerplate</h3>
        </div>
        <div className="example-img" />
      </div>
    );
  }
}
