import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LogoImg from './Landing/img/tomato_on.png';

const Wrap = styled.div`
  position:relative;
  width:100vw;
  height:100vh;
  background-color: #f03e3e;
`;

const LandingHeader = styled.header`
  height: 95vh;
`;

const LinkWrap = styled.div`
  position: fixed !important;
  left: 50%;
  bottom: 20%;
  display: flex;
  justify-content: center;
  transform: translateX(-50%);
`;
const HeaderLogo = styled.div`
  padding: 40% 0 0;
`;
const HeaderText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const HeaderLink = styled(Link)`
  display: inline-block;
  font-size:1.2em !important;
`;

export default class Landing extends Component {
  render() {
    return (
      <Wrap>
        <LandingHeader>
          <HeaderLogo>
            <Image src={LogoImg} alt="Logo" size="tiny" centered />
          </HeaderLogo>
          <HeaderText>
            <h1 className="heading-primary">
              <span className="heading-primary--main">PPOM</span>
              <span className="heading-primary--sub">pomodoro timer</span>
            </h1>
          </HeaderText>

          <LinkWrap>
            <HeaderLink className="btn btn--white btn--animated" to="/guide/intro">시작하기</HeaderLink>
          </LinkWrap>

        </LandingHeader>
      </Wrap>
    );
  }
}
