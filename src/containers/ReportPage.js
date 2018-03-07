import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Report from '../components/Report';

const Wrapper = styled.div`
  position:relative;
  width: 100vw;
  height: 100vh;
`;


export default class ReportPage extends Component {
  render() {
    return (
      <Wrapper>
        <Header leftLabel="뒤로" leftTo="/" title="기록" />
        <Report />
      </Wrapper>
    );
  }
}
