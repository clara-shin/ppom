import React, { Component } from 'react';
import styled from 'styled-components';

import UserInfo from '../components/Report/UserInfo';
import Records from '../components/Report/Records';

const Wrapper = styled.div`
  padding:20px;
`;

export default class Report extends Component {
  render() {
    return (
      <Wrapper>
        <UserInfo />
        <Records />
      </Wrapper>
    );
  }
}
