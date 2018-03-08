import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function withAuth(AuthWrappedComponent, NotAuthWrappedCompoent) {
  return class extends Component {
    state = {
      currentUser: null,
      loading: false,
      redirectToLogin: false,
    }

    componentWillMount() {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        this.setState({ currentUser });
      } else {
        this.setState({ loading: true });
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          if (user) {
            this.setState({
              currentUser: user.uid,
              loading: false,
            });
          } else {
            this.setState({ redirectToLogin: true });
          }
        });
      }
    }

    render() {
      const { redirectToLogin, loading } = this.state;
      if (redirectToLogin && !NotAuthWrappedCompoent) {
        return (
          <Redirect to="/login" />
        );
      } else if (redirectToLogin && NotAuthWrappedCompoent) {
        return (
          <NotAuthWrappedCompoent {...this.props} />
        );
      } else if (loading) {
        return (
          <Dimmer active={loading}>
            <Loader>Loading</Loader>
          </Dimmer>
        );
      }
      return (
        <AuthWrappedComponent {...this.props} />
      );
    }
  };
}
