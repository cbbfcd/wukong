import React, { Component } from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { rehydrate, hotRehydrate } from 'rfx-core';
import './assets/style/main.scss';
import "babel-polyfill";       


if (__PROD__) {
  console.info('[当前环境]: 生产环境');
}

if (__DEV__) {
  console.info('[当前环境]: 开发环境');
}

const MOUNT_NODE = document.getElementById('app');

const renderApp = (AppComponent) => {
  render(
    <AppContainer>
      <BrowserRouter>
        <Provider store={__PROD__ ? rehydrate() : hotRehydrate()}>
          <AppComponent />
        </Provider>
      </BrowserRouter>
    </AppContainer>,
		MOUNT_NODE
	);
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
