import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import './App.css';
import CryptoContent from '../../containers/CryptoContent/CryptoContent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Crypto Info</h1>
        </header>
        <CryptoContent />
      </div>
    );
  }
}

export default hot(module)(App);
