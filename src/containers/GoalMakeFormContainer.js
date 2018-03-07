import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGoal, checkValidGoal, fetchGoal, deleteGoal } from '../ducks/goalMakeForm';
import GoalMakeForm from '../components/GoalMakeForm';
// import withLoading from '../hocs/withLoading';

class GoalMakeFormContainer extends Component {
  static defaultProps = {
    onMount: () => { },
    removeSuccess: false,
  }

  componentDidMount() {
    const { gid } = this.props.match.params;
    this.props.onMount({ gid });
  }

  render() {
    const {
      onMount, removeSuccess, success, ...rest
    } = this.props;
    if (success || removeSuccess) {
      return (
        <Redirect to="/list" />
      );
    }
    return (
      <GoalMakeForm {...rest} />
    );
  }
}

export default connect(
  state => ({
    creating: state.goalMakeForm.creating,
    errorMsg: state.goalMakeForm.errorMsg,
    success: state.goalMakeForm.success,
    removeSuccess: state.goalMakeForm.removeSuccess,
    checkingItem: state.goalMakeForm.checkingItem,
    goalDetail: state.goalMakeForm.goalDetail,
  }),
  dispatch => ({
    onMount: ({ gid }) => {
      dispatch(fetchGoal({ gid }));
    },
    onSubmit: ({
      goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy, gid,
    }) => {
      dispatch(createGoal({
        goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy, gid,
      }));
    },
    onChange: ({
      goal, ppomtime, longbreaktime, longbreakfrqncy, breaktime, checkingItem,
    }) => {
      dispatch(checkValidGoal({
        goal, ppomtime, longbreaktime, longbreakfrqncy, breaktime, checkingItem,
      }));
    },
    onDelete: ({ gid }) => {
      dispatch(deleteGoal({ gid }));
    },
  }),
)(GoalMakeFormContainer);
