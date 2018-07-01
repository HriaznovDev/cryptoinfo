import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BackTop } from 'antd';
import './App.css';
import CryptoContent from '../../containers/CryptoContent/CryptoContent';
import Particles from 'react-particles-js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Particles height="180px" />
          <h1 className="App-title">Crypto Info</h1>
        </header>
        <CryptoContent />
        <BackTop />
      </div>
    );
  }
}

export default hot(module)(App);
