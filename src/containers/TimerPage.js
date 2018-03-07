import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  applyStartTimer,
  applyPauseOrRestartTimer,
  fetchTimerInfo,
} from '../ducks/timer';
import Timer from '../components/Timer';
import withAuth from '../hocs/withAuth';

class TimerPage extends Component {
  static defaultProps = {
    onMount: () => {},
  }

  componentDidMount() {
    const { gid } = this.props.match.params;
    this.props.onMount({ gid });
  }

  render() {
    const { onMount, ...rest } = this.props;
    return (
      <Timer {...rest} />
    );
  }
}

export default withAuth(connect(
  state => ({
    timerType: state.timer.timerType,
    isPlaying: state.timer.isPlaying,
    elapsedTime: state.timer.elapsedTime,
    ppomTimes: state.timer.ppomTimes,
    timerDetail: state.timer.timerDetail,
  }),
  dispatch => ({
    onMount: ({ gid }) => {
      dispatch(fetchTimerInfo({ gid }));
    },
    startTimer: () => {
      dispatch(applyStartTimer());
    },
    pauseTimer: () => {
      dispatch(applyPauseOrRestartTimer(true));
    },
    restartTimer: () => {
      dispatch(applyPauseOrRestartTimer(false));
    },
  }),
)(TimerPage));
