import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import LoginScreen from '../components/LoginScreen';

export default class LoginScreenContainer extends Component {
  state = {
    redirectToList: false,
  }

  completeGoogleLogin = async () => {
    // 로딩인디케이터
    const redirectResult = await firebase.auth().getRedirectResult();
    // 해제
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
    if (this.state.redirectToList) {
      return (
        <Redirect to="/list" />
      );
    }
    return (
      <LoginScreen
        onGoogleLogin={this.handleGoogleLogin}
        onLoginComplete={this.completeGoogleLogin}
      />
    );
  }
}
