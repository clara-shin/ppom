import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import DefaultUserImg from './img/tomato_off.png';

const UserInfoWrap = styled.div`
  display:flex;
  flex-direction: column;
  & > h1 {
    order: 1;
    align-self: center;
    font-size:1.25em;
    font-weight:300;
    margin: 0;
  }
  & > p {
    width:64px;
    height: 70px;
    order:0;
    margin:0 auto 10px;
  }
  & > p img {
    width:100% !important;
    height:100% !important;
    border-radius: 0 !important;
  }
`;

const Username = styled.span`
  color:blue;
`;

export default class UserInfo extends Component {
  render() {
    return (
      <UserInfoWrap>
        <h1><Username>강한나</Username> 님</h1>
        <p>
          <Image src={DefaultUserImg} size="medium" circular />
        </p>
      </UserInfoWrap>
    );
  }
}
