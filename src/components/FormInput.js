import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'semantic-ui-react';
import styled from 'styled-components';

export const FormLabel = styled.label`
  display: inline-block;
  width: 40%;
`;

export default class FormInput extends Component {
  render() {
    const {
      name, type, value, handleChange, label,
    } = this.props;
    return (
      <Form.Field inline required>
        <FormLabel>{label}</FormLabel>
        <Input name={name} type={type} value={value} onChange={handleChange} /> 분
      </Form.Field>
    );
  }
}
