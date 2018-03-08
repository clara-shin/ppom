import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import LoginPage from './containers/LoginPage';
import rootReducer from './ducks';
import ListPage from './containers/ListPage';
import GoalPage from './containers/GoalPage';
import TimerPage from './containers/TimerPage';
import RecordPage from './containers/RecordPage';
import LandingPage from './containers/LandingPage';
import GuidePage from './containers/GuidePage';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/list" component={ListPage} />
            <Route path="/make-goal" component={GoalPage} />
            <Route path="/edit-goal/:gid" component={GoalPage} />
            <Route path="/timer/:gid" component={TimerPage} />
            <Route path="/record" component={RecordPage} />
            <Route path="/guide/:type" component={GuidePage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
