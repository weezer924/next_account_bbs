import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';

class Address extends Component {
  constructor(props) {
    super(props);
    this.logined = this.logined.bind(this);
  }

  logined() {
    this.getFireData();
  }

  logouted() {
    Router.push('/address')
  }

  getFireData() {
    if (this.props.email == undefined || this.props.email == '') {
      return;
    }
    let email = Lib.encodeEmail(this.props.email);
    let db = firebase.database();
    let ref = db.ref('address/')

    let self = this;
    ref.orderByKey().equalTo(email).on('value', snapshot => {
      let d = Lib.deepcopy(snapshot.val());
      this.props.dispatch({
        type: 'UPDATE_USER',
        value: {
          login: this.props.login,
          username: this.props.username,
          email: this.props.email,
          data: d,
          items: self.getItem(d)
        }
      });
    });
  }

  getItem(data) {
    if (data == undefined) {return; }
    let res = [];
    for (let i in data) {
      for(let j in data[i]) {
        let email = Lib.decodeEmail(j);
        let s = data[i][j]['name'];

        res.push(<li key={j} data-tag={email}
          onClick={this.go.bind(null, email)}>
            {data[i][j]['check'] == true ? <b>check</b> : ''}{s}({email})
          </li>
        )
      }
      break;
    }
    return res;
  }


  go(email) {
    Router.push('/address_show?email=' + email);
  }

  render() {
    return (
      <div>
        <Account onLogined={this.logined} onLogouted={this.logouted} />
        <ul>
          {this.props.item == [] ? <li key="0">no item.</li> : this.props.items}
        </ul>
      </div>
    )
  }
}

export default connect((state) => state)(Address);