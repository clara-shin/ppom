import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import LoginScreen from '../components/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    redirectToList: false,
    loading: false,
  }

  completeGoogleLogin = async () => {
    this.setState({
      loading: true,
    });
    const redirectResult = await firebase.auth().getRedirectResult();
    this.setState({
      loading: false,
    });
    if (redirectResult.credential) {
      this.setState({
        redirectToList: true,
      });
    }
  }

  handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  }

  render() {
    const { redirectToList, loading } = this.state;
    if (redirectToList) {
      return (
        <Redirect to="/list" />
      );
    }
    return (
      <LoginScreen
        loading={loading}
        onGoogleLogin={this.handleGoogleLogin}
        onLoginComplete={this.completeGoogleLogin}
      />
    );
  }
}
