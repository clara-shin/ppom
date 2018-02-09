import React from 'react';
import withAuth from '../hocs/withAuth';

const GoalList = () => (
  <div>목표 목록</div>
);

export default withAuth(GoalList);
