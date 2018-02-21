import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import GoalList from '../src/components/GoalList';

import withAuth from '../src/hocs/withAuth';

storiesOf('GoalList', module)
  .add('default', () => (
    <GoalList />
  ));
