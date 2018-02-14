import React from 'react';
import styled from 'styled-components';
import {
  Segment,
} from 'semantic-ui-react';

import withAuth from '../hocs/withAuth';

const GoalListWrap = styled.div`
  margin:20px;
`;

const GoalWrap = styled.a`
  display: block;
  position:relative;
  padding: 20px;
  &:after {
    content:'';
    display:block;
    clear:both;
  }
  &:before {
    content: '>';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 2em;

    visibility: hidden;
  }
  box-sizing: border-box;
  cursor: pointer;
  color:#181818;
`;
const PpomCount = styled.div`
  width: 30%;
  float: left;
  font-size: 1.4em;
  font-weight:bold;
  vertical-align: baseline;
  text-align: right;
  letter-spacing:-0.5px;
`;
const PpomNum = styled.strong`
  font-size: 2.4em;
  line-height: 1.6em;
  text-align: center;
`;
const GoalTitle = styled.div`
  display: block;
  float:left;
  display: -webkit-box;
  width: 70%;
  margin: 0 auto;
  font-size: 2em;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GoalList = () => (
  <GoalListWrap>
    <Segment stacked>
      <GoalWrap>
        <GoalTitle>독서하고 독후감 작성하기 독서하고 독후감 작성하기 독서하고 독후감 작성하기 독서하고 독후감 작성하기</GoalTitle>
        <PpomCount>
          <PpomNum>77</PpomNum> ppom
        </PpomCount>
      </GoalWrap>
    </Segment>
  </GoalListWrap>
);

export default withAuth(GoalList);
