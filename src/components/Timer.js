import React, { Component } from 'react';
import { Container, Header, Button, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import stampOn from './Timer/img/tomato_active_70x76.png';
import stampOff from './Timer/img/tomato_deactive_70x76.png';


const PpomTimerWrap = styled.div`
  margin: auto;
  background-color: #f03e3e;
`;
const BreakTimerWrap = styled.div`
  margin: auto;
  background-color: #099268;
`;
const LongBreakTimerWrap = styled.div`
  margin: auto;
  background-color: #556bb3;
`;
const stampStyle = { width: '50px', height: '54px', margin: '5px' };
const headerStyle = { paddingTop: '15px', color: '#ffffff', fontSize: '4em' };
const goalStyle = { paddingTop: '35%', color: '#ffffff', fontSize: '2em' };
const buttonStyle = {
  backgroundColor: '#f03e3e',
  paddingTop: '50px',
  paddingBottom: '40%',
};
const breakButtonStyle = {
  backgroundColor: '#099268',
  paddingTop: '50px',
  paddingBottom: '40%',
};
const longbreakButtonStyle = {
  backgroundColor: '#556bb3',
  paddingTop: '50px',
  paddingBottom: '40%',
};

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
          <PpomTimerWrap>
            <Container textAlign="center" fluid>
              <Header as="h2" style={goalStyle}>{goal}</Header>
              <Header as="h1" style={headerStyle}> {formatTime((ppomtime * 60) - elapsedTime)}</Header>
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
              <Segment basic style={buttonStyle}>
                {!isPlaying && (
                  <Button content="시작" inverted onClick={startTimer} />
                )}
                {isPlaying && (
                  <Button content="일시정지" inverted onClick={pauseTimer} />
                )}
              </Segment>
            </Container>
          </PpomTimerWrap>
        )}
        {(timerType === 'BREAK_TIMER') && (
          <BreakTimerWrap>
            <Container textAlign="center" fluid>
              <Header as="h2" style={goalStyle}>{quote}</Header>
              <Header as="h1" style={headerStyle}> {formatTime((breaktime * 60) - elapsedTime)}</Header>
              <Segment basic style={breakButtonStyle}>
                {!isPlaying && (
                  <Button content="시작" inverted onClick={startTimer} />
                )}
                {isPlaying && (
                  <Button content="일시정지" inverted onClick={pauseTimer} />
                )}
              </Segment>
            </Container>
          </BreakTimerWrap>
        )}
        {(timerType === 'LONG_BREAK_TIMER') && (
          <LongBreakTimerWrap>
            <Container textAlign="center" fluid>
              <Header as="h2" style={goalStyle}>{quote}</Header>
              <Header as="h1" style={headerStyle}> {formatTime((longbreaktime * 60) - elapsedTime)}</Header>
              <Segment basic style={longbreakButtonStyle}>
                {!isPlaying && (
                  <Button content="시작" inverted onClick={startTimer} />
                )}
                {isPlaying && (
                  <Button content="일시정지" inverted onClick={pauseTimer} />
                )}
              </Segment>
            </Container>
          </LongBreakTimerWrap>
        )}
      </div>
    );
  }
}
