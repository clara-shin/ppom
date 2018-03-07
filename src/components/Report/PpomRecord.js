import React, { Component } from 'react';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const Wrap = styled.div`
  margin-bottom:10px;
`;
const RecordWrap = styled.div`
  display: flex;
  justify-content:flex-start;

  width:100%;
  height:100%;
  position:relative;

  &:after {
    content:'';
    display:block;
    clear:both;
  }

  &:before {
    font-family:fontello;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 2em;
  }

  box-sizing: border-box;
  color:#181818;
`;

const PpomCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  font-weight:bold;
  vertical-align: baseline;
  text-align: right;
  letter-spacing:-0.5px;
`;

const PpomNum = styled.strong`
  font-size: 1.8em;
  text-align: center;
  padding-right: 5px;
  color: #f03e3e;
`;
const GoalTitle = styled.div`
  width: 70%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  overflow: hidden;
  font-size:1.25em;
`;

const CheerUpMessage = styled.div`
  text-align:right;
`;
export default class PpomRecord extends Component {
  render() {
    return (
      <Wrap>
        <Segment stacked>
          <RecordWrap>
            <GoalTitle>독서하고 독후감작성</GoalTitle>
            <PpomCount>
              <PpomNum>7</PpomNum> ppom
            </PpomCount>
          </RecordWrap>
          <CheerUpMessage>잘 하고 있어요!</CheerUpMessage>
        </Segment>
      </Wrap>
    );
  }
}
