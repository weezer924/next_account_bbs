import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this)
    this.reset = this.reset.bind(this)
  }

  doAction(e) {
    if (e.shiftKey) {
      return this.props.dispatch({type: 'DECREMENT'});
    } else {
      return this.props.dispatch({ type: 'INCREMENT'});
    }
  }

  reset() {
    return this.props.dispatch({ type: 'RESET'})
  }

  render() {
    return (
      <div>
        <p>{this.props.message}: {this.props.count}</p>
        <button onClick={this.doAction}>Count</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

export default connect((state) => state)(Counter)