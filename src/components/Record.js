import React, { Component } from 'react';
import { Menu, Image, Segment } from 'semantic-ui-react';
import styled, { ThemeProvider } from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import deactiveImg from './Timer/img/tomato_deactive_70x76.png';


const Wrapper = styled.div`
  padding:20px;
`;

// USER
const UserInfoWrap = styled.div`
  display:flex;
  flex-direction: column;
  & > h1 {
    order: 1;
    align-self: center;
    font-size:1.25em;
    font-weight:300;
    margin: 0;
  }
  & > p {
    width:64px;
    height: 70px;
    order:0;
    margin:0 auto 10px;
  }
  & > p img {
    width:100% !important;
    height:100% !important;
    border-radius: 0 !important;
  }
`;

const Username = styled.span`
  color:blue;
`;

// Tab
const TabMenu = styled(Menu)`
  justify-content: center;
`;

// 날짜선택 헤더 바
const DateRangeWrap = styled.div`
  display:flex;
  width:100%;
  height:40px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ced3d6;
  border-bottom:1px solid #ced3d6;
  margin-bottom:10px;
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

// Daily Record
const RecordWrap = styled.div`
  display: flex;
  justify-content:flex-start;
  align-items:center;
  width:100%;
  height:100%;
  position:relative;
  box-sizing: border-box;
  color:#181818;
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
  font-size:1.2em;
`;

const PpomCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  font-weight:bold;
  font-style:italic;
  vertical-align: baseline;
  text-align: right;
  letter-spacing:-0.5px;
`;

const PpomNum = styled.strong`
  font-size: 2.5em;
  text-align: center;
  color: #f03e3e;
  font-style: normal;
  padding-right: 5px;
`;


const CheerUpMessage = styled.div`
  text-align:right;
  font-weight:700;
  padding-top:10px;
`;

// Weekly Record
const WeekRecordWrap = styled.div`
  display: flex;
  justify-content:flex-start;
  align-items:center;
  width:100%;
  height:100%;
  position:relative;
  box-sizing: border-box;
  color: #181818;
  padding:10px;
  margin: 10px 0;
  border: 2px solid #ced3d6;
  border-left: 7px solid ${props => props.theme.color};
`;
WeekRecordWrap.defaultProps = {
  theme: {
    color: '#ced3d6',
  },
};
const GoalTitleForWeek = styled.div`
  width:60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2em;
  line-height:1.5;
  margin-right:10px;
`;
const WeeklyPpomCount = styled.div`
  width:25%;
  text-align: right;
`;

const WeeklyPpomNum = styled.strong`
  font-size: 1.2em;
  text-align: center;
  color: #f03e3e;
  font-style: normal;
  padding-right: 3px;
`;
const TotalTime = styled.span`
  width: 15%;
  text-align: center;
`;

// 리차트
const ChartWrap = styled.div`
  padding: 10px;
  overflow: hidden;
  & > div {
    margin-left: -25px;

  }
`;

const colors = ['#4a7ac0', '#f1484b', '#178c3d', '#e95b9b', '#f27a29', '#ab8e69', '#b4d34f', '#aaaaaa', '#2095e7', '#fdcc4c', '#53b29d', '#000000'];
export default class Record extends Component {
  static defaultProps = {
    details: [],
    userInfo: {},
    dateInfo: 'YYYY-MM-DD',
    activeItem: 'day',
  }

  getColor = (idx) => {
    const index = idx + 1;
    const quotient = index / colors.length;
    if (quotient > 0) {
      return colors[index % colors.length];
    }
    return colors[idx];
  }

  getTheme = (idx) => {
    const color = this.getColor(idx);
    console.log(color);
    return {
      color,
    };
  }

  getFormattedTime = (minute) => {
    if (minute > 60) {
      const hour = parseInt(minute / 60, 10);
      return `${hour}h ${minute - (hour * 60)}m`;
    }
    return `${minute}m`;
  }

  handleItemClick = (e, { name }) => {
    this.props.handleItemClick(name);
  }

  handleDateClick = (dayIdx) => {
    this.props.handleDateClick(dayIdx);
  }

  render() {
    const {
      details, userInfo, dateInfo, activeItem,
    } = this.props;
    const { name, photoURL } = userInfo;
    const dataArr = ('data' in details) ? details.data : [];
    const achieves = ('achieves' in details) ? details.achieves : {};
    return (
      <Wrapper>

        <UserInfoWrap>
          <h1><Username>{name}</Username> 님</h1>
          <Image src={photoURL} size="tiny" circular centered />
        </UserInfoWrap>

        <TabMenu pointing secondary>
          <Menu.Item name="day" active={activeItem === 'day'} onClick={this.handleItemClick} />
          <Menu.Item name="week" active={activeItem === 'week'} onClick={this.handleItemClick} />
        </TabMenu>

        <DateRangeWrap>
          <DateRangeButton name="prev" className="icon-left-open" onClick={() => this.handleDateClick(-1)} />
          <DateRange>
            <span>{dateInfo}</span>
          </DateRange>
          <DateRangeButton name="next" className="icon-right-open" onClick={() => this.handleDateClick(1)} />
        </DateRangeWrap>

        {
          (activeItem === 'day') && (
            <div>
              {details.length === 0 && (
                <Image src={deactiveImg} size="mini" circular centered />
              )}
              {details.length > 0 && details.map(({ goal, pomo, quote }) => (
                <Segment stacked>
                  <RecordWrap>
                    <GoalTitle>{goal}</GoalTitle>
                    <PpomCount>
                      <PpomNum>{pomo}</PpomNum> ppom
                    </PpomCount>
                  </RecordWrap>
                  <CheerUpMessage>{quote}</CheerUpMessage>
                </Segment>
              ))
              }
            </div>
          )
        }{
          (activeItem === 'week') && (
            <div>
              {dataArr.length === 0 && (
                <Image src={deactiveImg} size="tiny" circular centered />
              )}
              {dataArr.length > 0 && (
                <ChartWrap>
                  <ResponsiveContainer width="100%" aspect={1.0 / 0.45}>
                    <LineChart
                      width={400}
                      height={180}
                      data={dataArr}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      {
                        [...details.keys].map((key, idx) => (
                          <Line type="linear" dataKey={key} dot stroke={this.getColor(idx)} />
                        ))
                      }
                    </LineChart>
                  </ResponsiveContainer>
                </ChartWrap>
              )}{
                Object.entries(achieves).map(([goal, record], idx) => (
                  <ThemeProvider theme={this.getTheme(idx)}>
                    <WeekRecordWrap>
                      <GoalTitleForWeek>{goal}</GoalTitleForWeek>
                      <WeeklyPpomCount>
                        <WeeklyPpomNum>{record.pomo}</WeeklyPpomNum> ppom
                      </WeeklyPpomCount>
                      <TotalTime>{this.getFormattedTime(record.time)}</TotalTime>
                    </WeekRecordWrap>
                  </ThemeProvider>
                ))
              }
            </div>
          )
        }
      </Wrapper>
    );
  }
}
