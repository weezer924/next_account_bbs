import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/storage'

class Firefind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: []
    }

    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  doChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  doAction(e) {
    this.findFireData(this.state.input);
  }

  findFireData(s) {
    let db = firebase.database();
    let ref = db.ref('sample/');
    let self = this;
    ref.orderByKey().equalTo(s).on('value', (snapshot) => {
      self.setState({
        data: snapshot.val()
      })
    });
  }

  getTableData() {
    let result = [];
    if (this.state.data == null || this.state.data.length == 0) {
      return [<tr key="0"><th>NO DATA.</th></tr>];
    }

    for(let i in this.state.data) {
      result.push(<tr key={i}>
        <th>{this.state.data[i].ID}</th>
        <th>{this.state.data[i].name}</th>
        <th>{this.state.data[i].message}</th>
      </tr>);
    }
    return result;
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.doChange} style={this.style} value={this.state.input} />
        <button onClick={this.doAction}>Find</button>
        <hr />
        <table>
          <tbody>
            {this.getTableData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Firefind;