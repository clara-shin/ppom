import React from 'react';

import { storiesOf } from '@storybook/react';

import GoalList from '../src/components/GoalList';


storiesOf('GoalList', module)
  .add('default', () => (
    <GoalList />
  ));
