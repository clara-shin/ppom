import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'semantic-ui-react';
import styled from 'styled-components';

export const FormLabel = styled.label`
  display: block;
  float:left;
  width: 40%;
`;
const FormInputWrap = styled.div`
  $:after {
    content:'',
    display:block;
    clear:both;
  }
`;
export default class FormInput extends Component {
  render() {
    const {
      name, type, value, handleChange, label,
    } = this.props;
    return (
      <FormInputWrap>
        <Form.Field inline required>
          <FormLabel>{label}</FormLabel>
          <Input name={name} type={type} defaultValue={value} onChange={handleChange} />
        </Form.Field>
      </FormInputWrap>
    );
  }
}
