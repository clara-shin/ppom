import React from 'react';
import styled from 'styled-components';
import withAuth from '../hocs/withAuth';
import GoalListContainer from './GoalListContainer';
import Header from '../components/Header';
import FloatingNav from '../components/FloatingNav';

const Wrapper = styled.div`
  position:relative;
`;

const ListPage = () => (
  <div>
    <Wrapper>
      <Header />
      <GoalListContainer />
      <FloatingNav />
    </Wrapper>
  </div>
);

export default withAuth(ListPage);
