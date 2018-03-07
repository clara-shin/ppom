import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRecordInit, handleDateClick, handleItemClick } from '../ducks/record';
import withAuth from '../hocs/withAuth';
import Header from '../components/Header';
import Record from '../components/Record';

const Wrapper = styled.div`
  position:relative;
  width: 100vw;
  height: 100vh;
`;

class RecordPage extends Component {
  static defaultProps = {
    onMount: () => {},
  }
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    const { onMount, ...rest } = this.props;
    const leftFunc = () => {
      this.props.history.goBack();
    };
    return (
      <Wrapper>
        <Header title="기록" leftLabel="뒤로" leftFunc={leftFunc} />
        <Record {...rest} />
      </Wrapper>
    );
  }
}

export default withAuth(connect(
  state => ({
    details: state.record.details,
    loading: state.record.loading,
    userInfo: state.record.userInfo,
    dateInfo: state.record.dateInfo,
    activeItem: state.record.activeItem,
  }),
  dispatch => ({
    onMount: () => {
      dispatch(fetchRecordInit());
    },
    handleDateClick: (dayIdx) => {
      dispatch(handleDateClick(dayIdx));
    },
    handleItemClick: (item) => {
      dispatch(handleItemClick(item));
    },
  }),
)(RecordPage));
