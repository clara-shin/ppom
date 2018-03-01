import React, { Component } from 'react';
import { Form, TextArea, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from './Header';
import FormInput, { FormLabel } from './FormInput';
// 헤더 공통으로 쓸 예정

const Wrapper = styled.div`
  position:relative;
  height: 100vh;
`;
const GoalFormWrap = styled.div`
  padding:20px;
`;
const ButtonWrap = styled.div`
  width:60%;
`;
const PpomSet = styled.strong`
  margin-left:10px;
`;
export default class GoalMakeForm extends Component {
  static defaultProps = {
    errorMsg: '',
    onSubmit: () => {},
    onChange: () => {},
    creating: false,
  }

  state = {
    goal: '',
    ppomtime: 25,
    breaktime: 5,
    longbreaktime: 20,
    longbreakfrqncy: 4,
    checkingItem: '',
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
    const {
      goal, ppomtime, breaktime, longbreakfrqncy, longbreaktime,
    } = this.state;
    const { errorMsg, creating } = this.props;
    return (
      <Wrapper>
        <Header />
        <GoalFormWrap>
          <Form loading={creating}>
            <Form.Field required>
              <div className="dispBlock">
                <FormLabel>나의 목표</FormLabel>
                <TextArea
                  id="form-textarea-control-opinion"
                  name="goal"
                  label="나의 목표"
                  placeholder="목표가 무엇인가요?"
                  rows={2}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </Form.Field>

            <FormInput name="ppomtime" type="number" value={ppomtime} onChange={this.handleChange} label="집중시간" />

            <FormInput name="breaktime" type="number" value={breaktime} onChange={this.handleChange} label="쉬는 시간" />

            <Form.Field inline required>

              <FormLabel>긴 휴식 간격</FormLabel>
              <ButtonWrap>
                <Button.Group>
                  <Button name="frqncyMinus" icon={{ className: 'icon-minus' }} onClick={this.handleChange} />
                  <Button name="frqncyPlus" icon={{ className: 'icon-plus' }} onClick={this.handleChange} />
                </Button.Group>
                <PpomSet>{longbreakfrqncy}</PpomSet> 마다
              </ButtonWrap>
            </Form.Field>

            <FormInput name="longbreaktime" type="number" value={longbreaktime} onChange={this.handleChange} label="긴 쉬는 시간" />
            {
              errorMsg && (
                <Message negative>
                  <Message.Header>{ errorMsg }</Message.Header>
                </Message>
              )
            }
          </Form>
        </GoalFormWrap>
        <Button type="submit" onClick={this.handleSubmit} fluid size="big" className="btn-submit">저장</Button>
      </Wrapper>
    );
  }
}
