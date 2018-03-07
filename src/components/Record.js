import React, { Component } from 'react';
import { Menu, Image, Divider, Button, Segment } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import deactiveImg from './Timer/img/tomato_deactive_70x76.png';

let dayIdx = 0;
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

  getFormattedTime = (minute) => {
    if (minute > 60) {
      const hour = parseInt(minute / 60, 10);
      return `${hour} 시간 ${minute - (hour * 60)} 분`;
    }
    return `${minute} 분`;
  }

  handleItemClick = (e, { name }) => {
    this.props.handleItemClick(name);
  }

  handleDateClick = (e, { name }) => {
    dayIdx = (name === 'next') ? 1 : -1;
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
      <div>
        <Image src={photoURL} size="small" circular centered />
        <span>{name}</span>
        <Menu color="black" widths={2}>
          <Menu.Item name="day" active={activeItem === 'day'} onClick={this.handleItemClick} />
          <Menu.Item name="week" active={activeItem === 'week'} onClick={this.handleItemClick} />
        </Menu>
        <Divider />
        <Segment textAlign="center" padded="very">
          <Button name="prev" icon="left chevron" floated="left" onClick={this.handleDateClick} />
          <span>{dateInfo}</span>
          <Button name="next" icon="right chevron" floated="right" onClick={this.handleDateClick} />
        </Segment>
        {
          (activeItem === 'day') && (
            <div>
              {details.length === 0 && (
                <Image src={deactiveImg} size="tiny" circular centered />
              )}
              {details.length > 0 && details.map(({ goal, pomo, quote }) => (
                <div>
                  <span>{goal}</span>
                  <span>{pomo}</span>
                  <span>{quote}</span>
                </div>
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
                <ResponsiveContainer width="100%" aspect={1.0 / 0.25}>
                  <LineChart
                    width={400}
                    height={100}
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
              )}{
                Object.entries(achieves).map(([goal, record]) => (
                  <div>
                    <span>{goal}</span>
                    <span>{record.pomo}ppom</span>
                    <span>{this.getFormattedTime(record.time)}</span>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
