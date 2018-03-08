import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from '../slider';


const GuideWrap = styled.div`
  position:relative;
  width:100vw;
  height:100vh;
  overflow:hidden;
`;
const GuideBoxWrap = styled.div`
  width:100%;
  height:100%;
  background-color:gold;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
`;
export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      accessibility: true,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
    };
    return (
      <GuideWrap>
        <Slider ref={c => this.slider = c} {...settings}>
          <div key={1}>
            <GuideBoxWrap>
              <h3>시간이 리듬이 되는 뽀모도로 기법</h3>
              <ul>
                <li>계획과 일에 쫓기지 마세요.</li>
                <li>25분 집중, 5분 휴식의 리듬</li>
                <li>집중하는 습관,</li>
                <li>뽀모도로 기법입니다.</li>
              </ul>
            </GuideBoxWrap>
          </div>
          <div key={2}>
            <GuideBoxWrap>
              <h3>목표 설정, 뽐 타이머</h3>
              <ul>
                <li>습관이 최고의 계획</li>
                <li>목표는 단순하게</li>
                <li>실천은 분명하게</li>
              </ul>
              <p>
                <img />
              </p>
            </GuideBoxWrap>
          </div>
          <div key={3}>
            <GuideBoxWrap>
              <h3>일간, 주간 기록</h3>
              <ul>
                <li>당신의 노력, 뽐이 알고 있어요!</li>
                <li>시간관리 매니저</li>
                <li>PPOM TIMER</li>
              </ul>
            </GuideBoxWrap>
          </div>
          <div key={4}>
            <GuideBoxWrap>
              <h3>어제보다 나은 오늘,</h3>
              <p>뽐과 함께 만들어가요.</p>
            </GuideBoxWrap>
          </div>
        </Slider>
        <div style={{ textAlign: 'center' }} className="slider-btn-group">
          <button className="button prev" onClick={this.previous}>이전</button>
          <button className="button" onClick={this.next}>다음</button>
        </div>
      </GuideWrap>
    );
  }
}
