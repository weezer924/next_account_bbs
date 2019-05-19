import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase/app'

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

var fireapp;
try {
  firebase.initializeApp(config)
} catch (error) {
  console.log(error.message)
}
export default fireapp;

const initial = {
  login:false,
  username:'(click here!)',
  email: '',
  data: [],
  items: []
}

function fireReducer(state = initial, action) {
  switch(action.type) {
    case 'UPDATE_USER':
      return action.value;
    default:
      return state;
  }
}

export function initStore(state = initial) {
  return createStore(fireReducer, state, applyMiddleware(thunkMiddleware))
}
