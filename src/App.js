import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RootSaga } from './sagas/saga';
import './common/fontawesome/css/all.css';
import reducer from './reducers/reducers';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <AddTodo />
        <Todos />
      </Provider>
    );
  };
}

export default App;
