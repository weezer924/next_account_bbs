import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';

class AddressAdd extends Component {
  constructor(props) {
    super(props);
    if (this.props.login == false) {
      Router.push('/address');
    }

    this.state = {
      name: '',
      email: '',
      tel: '',
      memo: '',
      message: 'データを入力してください'
    }

    this.logined = this.logined.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeTel = this.onChangeTel.bind(this)
    this.onChangeMemo = this.onChangeMemo.bind(this)
    this.doAction = this.doAction.bind(this)
  }

  logined() {
    console.log('logined.');
  }
  logouted() {
    console.log('/address');
  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  onChangeTel(e) {
    this.setState({tel: e.target.value});
  }

  onChangeMemo(e) {
    this.setState({memo: e.target.value});
  }

  doAction(e) {
    let key = this.state.email;
    let data = {
      name: this.state.name,
      tel: this.state.tel,
      memo: this.state.memo
    }

    let db = firebase.database();
    let ref = db.ref('address/' + Lib.encodeEmail(this.props.email) + '/' + Lib.encodeEmail(this.state.email));
    ref.set(data);
    this.setState({
      name: '',
      email: '',
      tel: '',
      memo: '',
      message: '登録しました'
    })
  }

  render() {
    return (
      <div>
        <Account self={this} onLogined={this.logined} onLogouted={this.logouted} />
        <hr />
        <p>{this.state.message}</p>
        {this.props.login ? <table>
          <tbody>
            <tr>
              <th>name:</th>
              <td><input type="text" size="30" value={this.state.name} onChange={this.onChangeName} /></td>
            </tr>
            <tr>
              <th>email:</th>
              <td><input type="text" size="30" value={this.state.email} onChange={this.onChangeEmail} /></td>
            </tr>
            <tr>
              <th>tel:</th>
              <td><input type="text" size="30" value={this.state.tel} onChange={this.onChangeTel} /></td>
            </tr>
            <tr>
              <th>memo:</th>
              <td><input type="text" size="30" value={this.state.memo} onChange={this.onChangeMemo} /></td>
            </tr>
            <tr>
              <th></th>
              <td>
                <button onClick={this.doAction}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
        :
        <p>please login...</p>
      }
      </div>
    );
  }
}

export default connect((state) => state)(AddressAdd);