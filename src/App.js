import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import LoginScreenContainer from './containers/LoginScreenContainer';
import MainScreen from './components/MainScreen';
import withAuth from './hocs/withAuth';
import rootReducer from './ducks';

const store = createStore(rootReducer, applyMiddleware(thunk));
const Home = withAuth(() => <Redirect to="/list" />);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginScreenContainer} />
            <Route path="/list" component={MainScreen} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
