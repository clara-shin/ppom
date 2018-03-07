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
    const leftFunc = () => {
      this.props.history.push('/make-goal');
    };
    const rightFunc = () => {
      this.props.history.push('/record');
    };
    const backFunc = () => {
      this.props.history.goBack();
    };

    return (
      <Wrapper>
        <Header leftLabel="추가" leftTo="/make-goal" title="목표" rightLabel="기록" rightTo="/" />
        {
          isEditList && (
            <Header title="목표 편집" leftLabel="뒤로" leftFunc={backFunc} />
          )
        }
        {
          !isEditList && (
            <Header title="목표" leftLabel="추가" leftFunc={leftFunc} rightLabel="기록" rightFunc={rightFunc} />
          )
        }
        <GoalListContainer isEditList={isEditList} />
        <FloatingNav onClickEdit={this.onEditGoals} />
      </Wrapper>
    );
  }
}

export default withAuth(ListPage);
