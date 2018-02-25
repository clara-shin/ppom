import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoalList } from '../ducks/goalList';
import GoalList from '../components/GoalList';
// import withLoading from '../hocs/withLoading';

class GoalListContainer extends Component {
  static defaultProps = {
    onMount: () => {},
    isEditList: false,
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { onMount, ...rest } = this.props;
    return (
      <GoalList {...rest} />
    );
  }
}

export default connect(
  state => ({
    goals: state.goalList.goals,
    loading: state.goalList.loading,
  }),
  dispatch => ({
    onMount: () => {
      dispatch(fetchGoalList());
    },
  }),
)(GoalListContainer);
