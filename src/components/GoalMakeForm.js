import React, { Component } from 'react';
import { Form, TextArea, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import FormInput, { FormLabel } from './FormInput';

const Wrapper = styled.div`

`;
const GoalFormWrap = styled.div`
  padding:20px;
  height:85vh;
`;
const ButtonWrap = styled.div`
  width:60%;
`;
const PpomSet = styled.strong`
  margin-left:10px;
`;

const SaveButton = styled(Button)`

  width: 50%;
  height: 8.5%;
  font-weight: 400 !important;
  border-radius: 0;
  font-size: 20px;
`;
const DeleteButton = styled(Button)`
  width: 50%;
  height: 8.5%;
  font-weight: 400 !important;
  border-radius: 0;
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display:flex;
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 8.5%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-weight: 400 !important;
  border-radius: 0;
  font-size: 20px;
`;


export default class GoalMakeForm extends Component {
  static defaultProps = {
    creating: false,
    errorMsg: '',
    onChange: () => {},
    onSubmit: () => {},
    onDelete: () => {},
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

  handleDeleteClick = () => {
    this.props.onDelete(this.state);
  }

  handleSaveClick = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    const { errorMsg, creating } = this.props;
    const {
      goal, ppomtime, breaktime, longbreaktime, longbreakfrqncy, gid,
    } = this.state;

    return (
      <Wrapper>
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
                  value={goal}
                  disabled={(gid)}
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

        <ButtonGroup>
          <DeleteButton type="submit" size="big" className="btn-delete" onClick={this.handleDeleteClick}>삭제</DeleteButton>
          <SaveButton type="submit" size="big" className="btn-submit active" onClick={this.handleSaveClick}>저장</SaveButton>
        </ButtonGroup>
      </Wrapper>
    );
  }
}
