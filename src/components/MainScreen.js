import React, { Component } from 'react';
import styled from 'styled-components';
import { } from 'semantic-ui-react';

import Header from './Header';
import GoalList from './GoalList';
import FloatingNav from './FloatingNav';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

export default class MainScreen extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <GoalList />
        <FloatingNav />
      </Wrapper>
    );
  }
}
