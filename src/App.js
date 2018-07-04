import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import './App.css';
import Trello from './components/trello';
import allReducers from './reducers/index.js';

function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
  } catch(e){
    console.log(e)
  }
}

function loadFromLocalStorage () {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(allReducers,persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()))

class App extends Component {
 render() {
    return (
      <Provider store = {store}>
      <Trello />
      </Provider>
    );
  }
}

export default App;
