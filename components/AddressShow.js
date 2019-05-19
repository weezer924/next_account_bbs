import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';

class AddressShow extends Component {
  constructor(props) {
    super(props);
    if (this.props.login == false) {
      Router.push('/address');
    }

    this.state = {
      last: -1,
      input: '',
      email: Router.query.email,
      address: null,
      message: Router.query.email + 'のデータ'
    }

    this.logined = this.logined.bind(this)
    this.doAction = this.doAction.bind(this)
    this.doChange = this.doChange.bind(this)
  }

  logined() {
    console.log('logined.');
  }
  logouted() {
    console.log('/address');
  }

  getAddress(email) {
    let db = firebase.database();
    let ref0 = db.ref('address/' + Lib.encodeEmail(this.props.email) + '/' + Lib.encodeEmail(this.state.email) + '/check');
    ref0.set(false);
    let ref = db.ref('address/' + Lib.encodeEmail(this.props.email));
    let self = this;
    ref.orderByKey().equalTo(Lib.encodeEmail(email)).on('value', snapshot => {
      for(let i in snapshot.val()) {
        let d = Lib.deepcopy(snapshot.val()[i]);
        self.setState({
          address: d
        });
        break;
      }
    });
  }

  doChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  doAction() {
    let from = Lib.encodeEmail(this.props.email);
    let to = Lib.encodeEmail(this.state.email);
    let db = firebase.database();
    let d = new Date().getTime();
    let ref = db.ref('address/' + from + '/' + to + '/messages/' + d);
    ref.set('to:' + this.state.input);
    let ref2 = db.ref('address/' + to + '/' + from + '/messages/' + d);
    ref2.set('from:' + this.state.input);
    let ref3 = db.ref('address/' + to + '/' + from + '/check/');
    ref3.set(true);
    this.setState({ input: '' })
  }

  render() {
    if (this.state.address == null) {
      this.getAddress(Router.query.email);
    }
    let items = [];
    if (this.state.address != null) {
      for (let n in this.state.address.messages) {
        items.unshift(<li key={n}>{this.state.address.messages[n]}</li>);
      }
    }

    return (
      <div>
        <Account onLogined={this.logined} onLogouted={this.logouted} />
        <p>{this.state.message}</p>
        <hr />
        {this.state.address != null
        ?
        <table>
          <tbody>
            <tr>
              <th>NAME</th>
              <td>{this.state.address.name}</td>
            </tr>
            <tr>
              <th>MAIL</th>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <th>TEL</th>
              <td>{this.state.address.tel}</td>
            </tr>
            <tr>
              <th>MEMO</th>
              <td>{this.state.address.memo}</td>
            </tr>
          </tbody>
        </table>
        :
        <p>no-address</p>}
        <hr />
        <fieldset>
          <p>Message:</p>
          <input type="text" size="40" value={this.state.input} onChange={this.doChange} />
          <button onClick={this.doAction}>send</button>
        </fieldset>
        {this.state.address != null && this.state.address.messages != null ?
        <div>
          <p>{this.state.address.name}さんとのメッセージ</p>
          <ul>{items}</ul>
        </div> : <p>メッセージはありません</p>}
      </div>
    )
  }
}

export default connect((state) => state)(AddressShow);