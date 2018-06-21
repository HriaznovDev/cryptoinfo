import React, { Component } from 'react';
import './App.css';
import CryptoContent from '../containers/CryptoContent';

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

export default App;
