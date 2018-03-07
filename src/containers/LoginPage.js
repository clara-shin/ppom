import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import LoginScreenContainer from './LoginScreenContainer';

const Wrapper = styled.div`
  position:relative;
  width: 100vw;
  height: 100vh;
`;

export default class LoginPage extends Component {
  render() {
    return (
      <Wrapper>
        <Header title="ppom" />
        <LoginScreenContainer />
      </Wrapper>
    );
  }
}
