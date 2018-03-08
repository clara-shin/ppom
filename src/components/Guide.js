import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import GoalListImg from './Guide/img/ppom-list.png';
import DayRecordImg from './Guide/img/daily-record.png';
import WeekRecordImg from './Guide/img/weekly-record.png';
import GoalFormImg from './Guide/img/goal-make-form.png';
import PpomStep1Img from './Guide/img/ppom-step-1.png';
import PpomStep2Img from './Guide/img/ppom-step-2.png';
import PpomStep3Img from './Guide/img/ppom-step-3.png';
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
  background-color:#ced3d6;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items: center;
  overflow:hidden;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  letter-spacing: -2px;
`;

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.page = 1;
  }

  setPage(n) {
    this.page += n;
  }

  getPage() {
    return this.page;
  }

  next() {
    if (this.getPage() === 4) {
      const { type } = this.props.match.params;
      if (type === 'intro') {
        this.props.history.push('/login');
      } else {
        this.props.history.push('/list');
      }
    } else {
      this.setPage(1);
      this.slider.slickNext();
    }
  }

  previous() {
    this.setPage(-1);
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
              <Image src={GoalFormImg} alt="뽐 리스트 이미지" size="medium" centered className="slideImg" />
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
              <ImageWrap>
                <Image src={PpomStep1Img} alt="뽐 리스트 이미지" size="medium" centered className="slideImg miniImg" />
                <Image src={PpomStep2Img} alt="뽐 리스트 이미지" size="medium" centered className="slideImg miniImg" />
                <Image src={PpomStep3Img} alt="뽐 리스트 이미지" size="medium" centered className="slideImg miniImg" />
              </ImageWrap>
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
              <ImageWrap>
                <Image src={DayRecordImg} alt="뽐 리스트 이미지" size="medium" centered className="slideImg smallimg" />
                <Image src={WeekRecordImg} alt="뽐 리스트 이미지" size="medium" centered className="slideImg smallimg" />
              </ImageWrap>
            </GuideBoxWrap>
          </div>
          <div key={4}>
            <GuideBoxWrap>
              <h3>어제보다 나은 오늘,</h3>
              <p>뽐과 함께 만들어가요.</p>
              <Image src={GoalListImg} alt="뽐 리스트 이미지" size="medium" centered className="slideImg" />
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
