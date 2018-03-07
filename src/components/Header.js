import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import { Link } from 'react-router-dom';

export const Wrap = styled.header`
  display:flex;
  min-height:56px;
  justify-content: space-between;
  align-items: center;
  padding:10px;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.bg};
  background-alpha: .5;
`;

export const Button = styled.button`
  display: inline-block;
  margin:0;
  padding:0;
  cursor:pointer;
`;
export const Link = Button.withComponent('a');

const HeaderLink = styled(Link)`
  display:block;
  width:49.45px;
  padding:10px;
  font-size: 16px;
  border-radius: 2px;
  color: ${props => props.theme.color};
  &:link, &:visited {
    color: ${props => props.theme.link};
  }
  &:hover, &:focus, &:active {
    color: ${props => props.theme.link};
  }
`;

export const Title = styled.h1`
  margin:0;
  padding:0;
  font-weight:normal;
  font-size: 20px;
  color: ${props => props.theme.color};
`;

HeaderLink.defaultProps = {
  theme: {
    color: '#fff',
    link: '#fff',
  },
};

Wrap.defaultProps = {
  theme: {
    color: '#fff',
    bg: '#f03e3e',
  },
};


export default class Header extends Component {
  render() {
    const { title } = this.props;
    const hasLeft = ('leftLabel' in this.props);
    const hasRight = ('rightLabel' in this.props);
    const theme = ('theme' in this.props && this.props.theme === 'white')
      ? {
        bg: '#ffffff30',
        color: '#fff',
        link: '#fff',
      }
      : {
        bg: '#f03e3e',
        color: '#fff',
        link: '#fff',
      };

    return (
      <ThemeProvider theme={theme}>
        <Wrap>
          <HeaderLink onClick={(hasLeft) ? this.props.leftFunc : () => {}}>
            {(hasLeft) ? this.props.leftLabel : ''}
          </HeaderLink>
          <Title>{title}</Title>
          <HeaderLink onClick={(hasRight) ? this.props.rightFunc : () => {}}>
            {(hasRight) ? this.props.rightLabel : ''}
          </HeaderLink>
        </Wrap>
      </ThemeProvider>
    );
  }
}
