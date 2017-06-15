
/**
 * @description: 首页App组件
 */

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LazyRoute from 'lazy-route';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import TopNav from './example/TopNav';
import AboutWuKong from './example/AboutWuKong';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <div className="index-wrapper">
        {/* <DevTools />*/}
        <TopNav />

        <AboutWuKong />

      </div>

    );
  }
}
