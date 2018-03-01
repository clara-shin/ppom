import React, { Component } from 'react';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import GoalListContainer from './GoalListContainer';
import Header from '../components/Header';
import FloatingNav from '../components/FloatingNav';

const Wrapper = styled.div`
  position:relative;
`;

class ListPage extends Component {
  state = {
    isEditList: false,
  }

  onEditGoals = (isEdit) => {
    this.setState({
      isEditList: isEdit,
    });
  }

  render() {
    const { isEditList } = this.state;
    return (
      <Wrapper>
        <Header leftLabel="추가" leftTo="/make-goal" title="목표" rightLabel="기록" rightTo="/" />
        <GoalListContainer isEditList={isEditList} />
        <FloatingNav onClickEdit={this.onEditGoals} />
      </Wrapper>
    );
  }
}

export default withAuth(ListPage);
