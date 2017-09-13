
/**
 * @description: App component
 */

import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-wrapper">
        {/*<DevTools />*/}
        <Route 
          exact
          path = '/'
          render = { props => (
            <LazyRoute { ...props } component={ import("./example/Home") } />
          )}
        />
      </div>
    );
  }
}

