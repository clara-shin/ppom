import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
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
    isLogout: false,
  }

  onEditGoals = (isEdit) => {
    this.setState({
      isEditList: isEdit,
    });
  }

  onClickLogout = async () => {
    await firebase.auth().signOut();
    this.setState({
      isLogout: true,
    });
  }

  render() {
    const { isEditList, isLogout } = this.state;
    const leftFunc = () => {
      this.props.history.push('/make-goal');
    };
    const rightFunc = () => {
      this.props.history.push('/record');
    };
    const backFunc = () => {
      this.props.history.goBack();
    };

    if (isLogout) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <Wrapper>
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
        <FloatingNav onClickEdit={this.onEditGoals} onClickLogout={this.onClickLogout} />
      </Wrapper>
    );
  }
}

export default withAuth(ListPage);
