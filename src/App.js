import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import LoginPage from './containers/LoginPage';
import withAuth from './hocs/withAuth';
import rootReducer from './ducks';
import ListPage from './containers/ListPage';
import GoalPage from './containers/GoalPage';
import TimerPage from './containers/TimerPage';
import RecordPage from './containers/RecordPage';

const store = createStore(rootReducer, applyMiddleware(thunk));
const Home = withAuth(() => <Redirect to="/list" />);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/list" component={ListPage} />
            <Route path="/make-goal" component={GoalPage} />
            <Route path="/edit-goal/:gid" component={GoalPage} />
            <Route path="/timer/:gid" component={TimerPage} />
            <Route path="/record" component={RecordPage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
