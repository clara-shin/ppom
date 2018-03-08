import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Landing from '../components/Landing';
import withAuth from '../hocs/withAuth';

const MainPage = () => <Redirect to="/list" />;
class LandingPage extends Component {
  render() {
    return (
      <Landing />
    );
  }
}

export default withAuth(MainPage, LandingPage);
