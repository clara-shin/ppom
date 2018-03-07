import React, { Component } from 'react';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import GoalMakeFormContainer from './GoalMakeFormContainer';
import Header from '../components/Header';

const Wrapper = styled.div`
  position:relative;
  width: 100vw;
  height: 100vh;
`;

class GoalPage extends Component {
  render() {
    const { gid } = this.props.match.params;
    const title = (gid) ? '목표 편집' : '새로운 목표';
    const leftFunc = () => {
      this.props.history.goBack();
    };
    return (
      <Wrapper>
        <Header title={title} leftLabel="뒤로" leftFunc={leftFunc} />
        <GoalMakeFormContainer {...this.props} />
      </Wrapper>
    );
  }
}

export default withAuth(GoalPage);
