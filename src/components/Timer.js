import React, { Component } from 'react';
import styled from 'styled-components';
import stampOn from './Timer/img/tomato_active_70x76.png';
import stampOff from './Timer/img/tomato_deactive_70x76.png';

import Header from './Header';


const PpomTimerWrap = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f03e3e;
`;
const BreakTimerWrap = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #099268;
`;
const LongBreakTimerWrap = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #556bb3;
`;
const TimerTitle = styled.h1`
  width: 100%;
  font-size: 2em;
  padding: 3.5em 20px 0;
  color: #fff;
  text-align:center;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SetTimer = styled.p`
  display: block;
  font-size: 6.5em;
  color: #fff;
  font-weight: 100;
  margin: 0;
  padding: 0px 20px;
`;
const CurrStampWrap = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;
const TimerButtonWrap = styled.div`
`;
const TimerButton = styled.button`
  position: absolute;
  width: 120px;
  height: 120px;
  bottom: 10%;
  left: 50%;
  background-color: transparent;
  font-size: 25px;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 3px solid #fff;
  color: #fff;
`;
const stampStyle = { width: '50px', height: '54px', margin: '5px' };

function formatTime(time) {
  if (!time) return '';
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = parseInt(time % 60, 10);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10
    ? `0${seconds}`
    : seconds}`;
}

export default class PpomTimer extends Component {
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (!currentProps.isPlaying && nextProps.isPlaying) {
      const timerInterval = setInterval(() => {
        currentProps.addSecond();
      }, 1000);
      this.setState({
        interval: timerInterval,
      });
    } else if (currentProps.isPlaying && !nextProps.isPlaying) {
      clearInterval(this.state.interval);
    }
  }
  render() {
    const {
      isPlaying,
      elapsedTime,
      timerDetail,
      startTimer,
      pauseTimer,
      restartTimer,
      timerType,
      ppomTimes,
    } = this.props;
    const {
      ppomtime, goal, longbreaktime, breaktime, quote,
    } = timerDetail;

    return (
      <div>
        {(timerType === 'PPOM_TIMER') && (
          <div>
            <Header title="집중 시간" leftLabel="뒤로" rightLabel="다시" />
            <PpomTimerWrap>
              <TimerTitle>{goal}</TimerTitle>
              <SetTimer> {formatTime((ppomtime * 60) - elapsedTime)}</SetTimer>
              <CurrStampWrap>
                {
                  [...Array((ppomTimes > 5) ? 5 : ppomTimes)].map((e, i) => (
                    <img src={stampOn} alt={i} style={stampStyle} />
                  ))
                }
                {(ppomTimes < 5) && (
                  <img src={stampOff} alt="현재뽐" style={stampStyle} />)}
                {(ppomTimes > 5) && (
                  <span>x {ppomTimes}</span>
                )}
              </CurrStampWrap>
              <TimerButtonWrap>
                {!isPlaying && (
                  <TimerButton onClick={startTimer} >시작</TimerButton>
                )}
                {isPlaying && (
                  <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                )}
              </TimerButtonWrap>
            </PpomTimerWrap>
          </div>
        )}
        {(timerType === 'BREAK_TIMER') && (
          <div>
            <Header title="휴식 시간" leftLabel="뒤로" />
            <BreakTimerWrap>
              <TimerTitle>{quote}</TimerTitle>
              <SetTimer> {formatTime((breaktime * 60) - elapsedTime)}</SetTimer>
              <TimerButtonWrap>
                {!isPlaying && (
                  <TimerButton onClick={startTimer} >시작</TimerButton>
                )}
                {isPlaying && (
                  <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                )}
              </TimerButtonWrap>
            </BreakTimerWrap>
          </div>
        )}
        {(timerType === 'LONG_BREAK_TIMER') && (
          <div>
            <Header title="긴 휴식 시간" leftLabel="뒤로" />
            <LongBreakTimerWrap>
              <TimerTitle>{quote}</TimerTitle>
              <SetTimer> {formatTime((longbreaktime * 60) - elapsedTime)}</SetTimer>
              <TimerButtonWrap>
                {!isPlaying && (
                  <TimerButton onClick={startTimer} >시작</TimerButton>
                )}
                {isPlaying && (
                  <TimerButton onClick={pauseTimer} >일시정지</TimerButton>
                )}
              </TimerButtonWrap>
            </LongBreakTimerWrap>
          </div>
        )}
      </div>
    );
  }
}
