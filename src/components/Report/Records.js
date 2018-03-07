import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import styled from 'styled-components';

import PpomRecord from './PpomRecord';

const DateRangeWrap = styled.div`
  display:flex;
  width:100%;
  height:40px;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid #ddd;
  border-bottom:1px solid #ddd;
`;

const DateRangeButton = styled.button`
  font-family:'fontello' !important;
  cursor:pointer;
  font-size:1.5em;
  font-weight:300;
  padding: 0 10px;
  border: none;
  background: transparent;
`;

const DateRange = styled.h3`
  margin:0;
  font-size:1.1em;
  font-weight:300;
`;

// 날짜선택 헤더
const DateRangeBar = () => (
  <DateRangeWrap>
    <DateRangeButton className="icon-left-open" />
    <DateRange>
      <span>2018/01/21</span>
      { // week 탭을 클릭 시 날짜 선텍 헤더
        /* <span>2018/01/21</span> - <span>2018/01/21</span> */
     }
    </DateRange>
    <DateRangeButton className="icon-right-open" />
  </DateRangeWrap>
);

// 레코드 목록
const ReportedGoalList = styled.div`
  padding:20px 0;
`;

// 각 목표 레코드
const ReportedGoal = () => (
  <PpomRecord />
);
// 레코드가 비었을 경우
const EmptyRecord = () => (
  <div>아직 달성한 뽐이 없습니다!</div>
);

// 하루동안 목표 레코드 리스트
const DailyReportList = () => (
  <div>
    <DateRangeBar />
    <ReportedGoalList>
      <ReportedGoal />
      <ReportedGoal />
      <ReportedGoal />
      <ReportedGoal />
      <ReportedGoal />
      <ReportedGoal />
      <ReportedGoal />
      <EmptyRecord /> {/* 목표레코드가 없을 시 보여지는 디폴트 문구 */}
    </ReportedGoalList>
  </div>
);

// 한 주 동안 목표 레코드 리스트
const WeeklyReportList = () => (
  <div>
    <DateRangeBar />
    <div>주간 그래프</div>
    <div>
      {/* semantic-ui-react 에서 리본 사용해보기, 그래프에 나타난 컬러명과 동일하게 매치시키기 위해서 */}
      <span>책 읽기</span>
      <span>
        <strong>7</strong>ppom
      </span>
      <span>3h 30m</span> {/* 시간 값을 뿌릴 때 형식을 셋팅필요 ${h}h ${m}m */}
    </div>
  </div>
);

// 탭 메뉴 스타일
const TabMenu = styled(Tab)`
  margin-top:10px;
  & > div.ui.menu {
    justify-content: center;
  }
`;
// 탭
const panes = [
  { menuItem: 'Day', render: () => <Tab.Pane attached={false}><DailyReportList /></Tab.Pane> },
  { menuItem: 'Week', render: () => <Tab.Pane attached={false}><WeeklyReportList /></Tab.Pane> },
];

export default class Records extends Component {
  render() {
    return (
      <TabMenu menu={{ secondary: true, pointing: true }} panes={panes} />
    );
  }
}
