import React, { Component } from 'react';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const GoalListWrap = styled.div`
  margin:20px;
`;

const GoalWrap = styled.a`
  display: flex;
  justify-content:flex-start;
  width:100%;
  height:100%;
  position:relative;
  padding: 20px;
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
  cursor: pointer;
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
  /* height: 2.8em; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  overflow: hidden;
  font-size:1.4em;
`;

export default class GoalList extends Component {
  static defaultProps = {
    goals: [],
  }

  render() {
    const { goals } = this.props;
    return (
      <GoalListWrap>{
        goals.map(({ gid, ...goal }) => (
          <Segment key={gid} stacked>
            <GoalWrap className="icon icon-right-open">{/* 플로팅네비게이션 목표수정 메뉴 클릭 시 icon-right-open 추가 */}
              <GoalTitle>{goal.goal}</GoalTitle>
              <PpomCount>
                <PpomNum>{goal.pomo}</PpomNum> ppom
              </PpomCount>
            </GoalWrap>
          </Segment>
        ))
      }
      </GoalListWrap>
    );
  }
}
