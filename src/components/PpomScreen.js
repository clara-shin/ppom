import React, { Component } from 'react';

import {
  Form,
  Input,
  TextArea,
  Button,
} from 'semantic-ui-react';

import styled from 'styled-components';
// import { Wrapper } from './Header'; 헤더컴포넌트에서 Wrap 가져올 예정

//헤더 공통으로 쓸 예정

const FormLabel = styled.label`
  display:inline-block;
  width: 40%;
`;

export default class PpomScreen extends Component {
  state = {
    count: 0
  }

  handleUpClick = prevState => {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 마이너스 버튼을 눌르면 하나씩 감소하다가, count가 0되면 마이너스버튼 disabled

  render() {
    const { count } = this.state;

    return (
      <div>
        <strong>필수입력 *</strong>
        <Form>
          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='나의 목표'
            placeholder="목표가 무엇인가요?"
            rows={2}
            required
          />
          <Form.Field inline required>
            <FormLabel>집중 시간</FormLabel>
            <Input type="number" placeholder="25" /> 분
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>휴식 시간</FormLabel>
            <Input type="number" placeholder="5" /> 분
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>긴 휴식 간격</FormLabel>
            <Button icon={{ className: 'minus' }}></Button>
            <Button icon={{ className: 'plus' }} onClick={this.handleUpClick}></Button>
            <span>{count}</span> 마다
          </Form.Field>

          <Form.Field inline required>
            <FormLabel>긴 휴식 시간</FormLabel>
            <Input type="number" placeholder="30" /> 분
          </Form.Field>
          <Button type='submit' fluid primary>저장</Button>
        </Form>
      </div>
    )
  }
}
