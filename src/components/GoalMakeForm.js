import React, { Component } from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import Header from './Header';
// 헤더 공통으로 쓸 예정

const FormLabel = styled.label`
  display:inline-block;
  width: 40%;
`;

const Wrapper = styled.div`
  position:relative;
  width: 100vw;
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

  componentWillReceiveProps() {
    if (this.props.goalDetail) {
      const {
        gid, goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy,
      } = this.props.goalDetail;
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
        <Header />
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
          <Form.Field inline required>
            <FormLabel>집중 시간</FormLabel>
            <Input name="ppomtime" type="number" value={ppomtime} onChange={this.handleChange} /> 분
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>휴식 시간</FormLabel>
            <Input name="breaktime" type="number" value={breaktime} onChange={this.handleChange} /> 분
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>긴 휴식 간격</FormLabel>
            <Button name="frqncyMinus" icon={{ className: 'minus' }} onClick={this.handleChange} />
            <Button name="frqncyPlus" icon={{ className: 'plus' }} onClick={this.handleChange} />
            <span>{longbreakfrqncy}</span> 마다
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>긴 휴식 시간</FormLabel>
            <Input name="longbreaktime" type="number" value={longbreaktime} onChange={this.handleChange} /> 분
          </Form.Field>
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
