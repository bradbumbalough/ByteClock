import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const toBinary = (number) => {
  return ('0'.repeat(8) + parseInt(number).toString(2)).substr(-6);
}

class App extends Component {
  constructor() {
    super() 
    this.state = {
      time: new Date(),
      interval: null,
      showDec: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    let interval = setInterval(() => {
      this.setState({time: new Date()})
    }, 250);
    this.setState({interval});
    window.addEventListener('keypress', this.handleKeyPress);
  }
  
  handleKeyPress(event) {
    if (event.code === 'Space') {
      this.setState({showDec: !this.state.showDec});
    }
  }
  
  componentWillMount() {
    clearInterval(this.state.interval);
    this.setState({interval: null});
    window.removeEventListener('keypress', this.handleKeyPress);
  }
  m
  render() {
    let {time} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ByteClock</h2>
        </div>
        <p className="App-intro">
    Show Decimal? <input type="checkbox" checked={this.state.showDec} onChange={({target}) => {
      this.setState({showDec: target.checked});  
    }}/> (Space key)
          <div style={styles.numbers}>
            <Number showDec={this.state.showDec}>{time.getHours()}</Number>
            <Number showDec={this.state.showDec}>{time.getMinutes()}</Number>
            <Number showDec={this.state.showDec}>{time.getSeconds()}</Number>
          </div>
        </p>
      </div>
    );
  }
}

const Number = ({children, showDec}) => {
  return (
    <div style={styles.number}>
      <span style={styles.binary} title={children}>{toBinary(children)}</span>
      {showDec && (
        <div style={styles.decimal}>
          {children}
        </div>
      )}
    </div>
  );
}

let styles = {
  numbers: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50
  },
  number: {
    display: 'inline-block',
    padding: 40,
    fontWeight: 100,
  },
  decimal: {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 25,
    color: '#E5E5E5'
  },
  binary: {
    fontSize: 100,
    fontFamily: 'Courier New, monospace',
    color: '#3D3D3D',
  }
};

export default App;
