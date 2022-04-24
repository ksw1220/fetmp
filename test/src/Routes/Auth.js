import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { GoogleLogin } from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';

import Auth from "../Styles/Images/Auth.svg";
import kakao from "../Styles/Images/kakao.svg";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3% 10%;
`;

const Top = styled.div`
  text-align: center;
  font-size: 2rem;
  color: #000070;
  margin-bottom: 1rem;
  @media ${(props) => props.theme.tablet}{
        font-size: 3vh;
        margin-bottom: 2rem;
    }
`;

const Content = styled.div`
  display: flex;
  @media ${(props) => props.theme.tablet}{
        flex-direction: column;
    }
`;

const Img = styled.img`

`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 20%;
  padding-left: 10%;
  @media ${(props) => props.theme.mobile}{
        width: 90% !important;
    }
  @media ${(props) => props.theme.tablet}{
    padding-left: 0;
      margin-top: 5vh;
        width: 50%;
    }

`;

const Txt = styled.div`
  color: #000070;
    width: fit-content;
    margin: 0 auto;
    background-color: white;
    padding-bottom: 2rem;
    font-size: 1.2rem;
`;
const Line = styled.div`
    background-color: #000070;
    height: 1px;
    width: 100%;
    position: relative;
    top: -2.5rem;
    z-index: -1;
`;

const Klogo = styled.img`
  width: 1rem;
  margin-right: 1.5rem;
  margin-left: 10px;
`;

const KaKaoBtn = styled(KaKaoLogin)`
  width: 100% !important;
  height: 40px  !important;
  line-height: 40px  !important;
  text-align: left !important;
  font-size: 14px !important;
  font-family: 'Noto Sans CJK KR' !important;
  border-radius: 3rem !important;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
  margin-top: 3rem;
  &:hover {
    opacity: 0.8;
  }
`;

const GoogleBtn = styled(GoogleLogin)`
  width: 100% !important;
  height: 40px  !important;
  line-height: 40px  !important;
  font-size: 14px !important;
  font-family: 'Noto Sans CJK KR';
  border-radius: 3rem !important;
  overflow: hidden;
  &:hover {
    opacity: 0.8 !important;
  }
`;



export default ({ }) => {
  const [userObj, setUserObj] = useState({})

  // 카카오
  const kakaoLoginFunc = (res) => {
    if (res) {
      axios.post("http://localhost:8080/api/log-in", {
        idToken: 9999999999 - res.profile.id,
        token: res.response.access_token,
        nickName: res.profile.properties.nickname,
      })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("login", response.data.idToken);
          window.location.replace("/");
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  return (
    <Container>
      <Top>환영합니다</Top>

      <Content>
        <Img src={Auth} />
        <Login>
          <Txt>간편로그인</Txt>
          <Line />
          <KaKaoBtn
            token={'cb21585076043446225f15568416bac0'}
            onSuccess={response => kakaoLoginFunc(response)}
            getProfile={true}
          ><Klogo src={kakao} /> Continue with Kakao</KaKaoBtn>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button
            onClick={(e) => { window.location.replace("/#/sign-in") }}
          >
            로그인
          </button>
          <button
            onClick={(e) => { window.location.replace("/#/sign-up") }}
          >
            회원가입
          </button>
        </Login>
      </Content>
    </Container>
  )
}