import React, { Component } from 'react';
import {
  Form,
  TextArea,
  Button,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import FormInput, { FormLabel } from './FormInput';

const Wrapper = styled.div`
  position:relative;
  /* width: 100vw; */
  height: 100vh;
`;

export default class GoalMakeForm extends Component {
  static defaultProps = {
    creating: false,
    errorMsg: '',
    onChange: () => {},
    onSubmit: () => {},
    goalDetail: {},
  }

  state = {
    gid: '',
    goal: '',
    ppomtime: 25,
    breaktime: 5,
    longbreaktime: 20,
    longbreakfrqncy: 4,
    checkingItem: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.goalDetail) {
      const {
        gid, goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy,
      } = nextProps.goalDetail;
      this.setState({
        gid,
        goal,
        ppomtime,
        breaktime,
        longbreaktime,
        longbreakfrqncy,
      });
    }
  }

  handleChange = (e, { name, value }) => {
    if (name === 'frqncyMinus' || name === 'frqncyPlus') {
      const { longbreakfrqncy } = this.state;
      this.setState({
        longbreakfrqncy: (name === 'frqncyMinus') ? longbreakfrqncy - 1 : longbreakfrqncy + 1,
        checkingItem: 'longbreakfrqncy',
      });
    } else {
      this.setState({
        [name]: value,
        checkingItem: name,
      });
    }
    this.props.onChange(this.state);
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const { errorMsg, creating } = this.props;
    const {
      goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy,
    } = this.state;

    return (
      <Wrapper>
        <strong>필수입력 *</strong>
        <Form loading={creating}>
          <Form.Field
            id="form-textarea-control-opinion"
            name="goal"
            control={TextArea}
            label="나의 목표"
            placeholder="목표가 무엇인가요?"
            rows={2}
            onChange={this.handleChange}
            value={goal}
            required
          />
          <FormInput name="ppomtime" type="number" value={ppomtime} onChange={this.handleChange} label="집중시간" />

          <FormInput name="breaktime" type="number" value={breaktime} onChange={this.handleChange} label="쉬는 시간" />

          <Form.Field inline required>
            <FormLabel>긴 휴식 간격</FormLabel>
            <Button name="frqncyMinus" icon={{ className: 'minus' }} onClick={this.handleChange} />
            <Button name="frqncyPlus" icon={{ className: 'plus' }} onClick={this.handleChange} />
            <span>{longbreakfrqncy}</span> 마다
          </Form.Field>

          <FormInput name="longbreaktime" type="number" value={longbreaktime} onChange={this.handleChange} label="긴 쉬는 시간" />
          {
            errorMsg && (
              <Message negative>
                <Message.Header>{errorMsg}</Message.Header>
              </Message>
            )
          }
          <Button type="submit" onClick={this.handleSubmit} fluid primary>저장</Button>
        </Form>
      </Wrapper>
    );
  }
}
