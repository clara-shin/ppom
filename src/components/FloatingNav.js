import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dimmer,
  Icon,
} from 'semantic-ui-react';

const CustomButton = styled.button`
  display: inline-block;
  margin:0;
  padding:0;
  cursor:pointer;
`;
const Link = CustomButton.withComponent('a');
const Navigation = styled.nav`
  position: fixed;
  right:30px;
  bottom:30px;
  &:after{
    content:'';
    display:block;
    clear:both;
  }
  z-index: 10;
`;

const Gnb = styled.ul`
  position: absolute;
  width: 150px;
  top: -170px;
  left: -100px;
`;

const GnbList = styled.li`
  height: 50px;
  text-align: right;
  margin-bottom: 10px;
  color:#fff;
`;
const NavLink = Link.extend`
  display: inline-block;
  margin: 0 0 0 20px;
  padding: 0;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: #f03e3e;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  color: #fff;
  font-size: 1.3em;
  box-shadow: 1px 2px 3px #848484;
`;
export default class FloatingNav extends Component {
  static defaultProps = {
    onClickGuide: () => {},
    onClickEdit: () => {},
    onClickLogout: () => {},
    linkToGuide: false,
  }

  state = {
    active: false,
  }

  handleNavToggle = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  }

  // 가이드북 버튼 클릭 시
  handleClickGuide = () => {
    this.props.onClickGuide();
    this.handleNavToggle();
  }
  // 뽀모수정 버튼 클릭 시 이벤트처리
  handleClickEdit = () => {
    if (this.state.active) {
      this.props.onClickEdit(true);
      this.handleNavToggle();
    }
  }

  handleClickLogout = () => {
    if (this.state.active) {
      this.props.onClickLogout();
      this.handleNavToggle();
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <Navigation>
          <Button
            className="btn btn-navi"
            icon={{ className: `icon icon-ellipsis-vert ${active ? 'icon-cancel-1' : ''}` }}
            onClick={this.handleNavToggle}
          />

          <Gnb className={`gnb ${active ? 'gnbshow' : ''}`}>
            <GnbList>
              <span>가이드북</span>
              <NavLink className={active ? 'show' : 'hide'} onClick={this.handleClickGuide}>
                <Icon className="icon-book" />
              </NavLink>
            </GnbList>
            <GnbList>
              <span>로그아웃</span>
              <NavLink className={active ? 'show' : 'hide'} onClick={this.handleClickLogout}>
                <Icon className="icon-logout-1" />
              </NavLink>
            </GnbList>
            <GnbList>
              <span>목표편집</span>
              <NavLink className={active ? 'show' : 'hide'} onClick={this.handleClickEdit}>
                <Icon className="icon-pencil-1" />
              </NavLink>
            </GnbList>
          </Gnb>

          <Dimmer active={active} page />
        </Navigation>
      </div>
    );
  }
}
