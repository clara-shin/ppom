import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrap = styled.header`
  display:flex;
  min-height:56px;
  justify-content: space-between;
  align-items: center;
  background-color: #f03e3e;
  color:#181818;
  padding:10px;
`;

export const Button = styled.button`
  display: inline-block;
  margin:0;
  padding:0;
  cursor:pointer;
`;
// export const Link = Button.withComponent('a');

const HeaderLink = styled(Link)`
  display:block;
  width:49.45px;
  padding:10px;
  font-size: 16px;
  border-radius: 2px;
  color: #fff;
  &:link, &:visited {
    color: #fff;
  }
  &:hover, &:focus, &:active {
    color: #fff;
  }
`;

export const Title = styled.h1`
  margin:0;
  padding:0;
  font-weight:normal;
  font-size: 20px;
  color:#fff;
`;

export default class Header extends Component {
  state = {
    leftTo: '',
    leftLabel: '',
    title: '',
    rightTo: '',
    rightLabel: '',
  };

  handleClick = () => {
    if (!this.props.leftTo) {
      this.props.history.goBack();
    }
  }
  render() {
    const tempProps = {};
    Object.assign(tempProps, this.state);
    Object.entries(this.props).forEach(([key, value]) => {
      tempProps[key] = value;
    });
    const {
      leftTo,
      leftLabel,
      title,
      rightTo,
      rightLabel,
    } = tempProps;

    return (
      <Wrap>
        <HeaderLink to={leftTo} onClick={this.handleClick}>
          {leftLabel}
        </HeaderLink>
        <Title>{title}</Title>
        <HeaderLink to={rightTo}>{rightLabel}</HeaderLink>
      </Wrap>
    );
  }
}
