import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGoal, checkValidGoal } from '../ducks/goalMakeForm';
import GoalMakeForm from '../components/GoalMakeForm';
// import withLoading from '../hocs/withLoading';

class GoalMakeFormContainer extends Component {
  render() {
    const { ...rest } = this.props;
    if (this.props.success) {
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
    checkingItem: state.goalMakeForm.checkingItem,
  }),
  dispatch => ({
    onSubmit: ({
      goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy,
    }) => {
      dispatch(createGoal({
        goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy,
      }));
    },
    onChange: ({
      goal, ppomtime, longbreaktime, longbreakfrqncy, breaktime, checkingItem,
    }) => {
      dispatch(checkValidGoal({
        goal, ppomtime, longbreaktime, longbreakfrqncy, breaktime, checkingItem,
      }));
    },
  }),
)(GoalMakeFormContainer);
