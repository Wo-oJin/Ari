import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { Logo } from "../components/common/Logo";
import { Container } from "../components/common/Container";
import { MainButton } from "../components/common/Button";
import { Kakao, Naver } from "../components/login/LoginUserStyle";

const LoginUser = () => {
  const [kakaoURL, setKakaoURL] = useState("");
  const [naverURL, setNaverURL] = useState("");

  // Oauth 로그인 요청 url 받아오기
  const getOauthURL = async () => {
    try {
      const { data } = await axios.get("/auth/login");

      setKakaoURL(data.kakao);
      setNaverURL(data.naver);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOauthURL();
  }, []);

  const onKakao = () => {
    window.location.href = kakaoURL;
  };

  const onNaver = () => {
    window.location.href = naverURL;
  };

  return (
    <>
      <Header text="로그인/회원가입" back={true}></Header>
      <Logo />
      <Container>
        <Kakao onClick={onKakao}>
          <RiKakaoTalkFill size="20" style={{ marginRight: "7px" }} />
          <span>카카오로 로그인</span>
        </Kakao>
        <Naver onClick={onNaver}>
          <SiNaver size="17" style={{ marginRight: "8px" }} />
          <span>네이버로 로그인</span>
        </Naver>
        <Link to="/login">
          <MainButton background="#4E514F">이메일로 로그인</MainButton>
        </Link>
        <div style={{ marginTop: "240px" }}></div>
        <Link to="/signupUser">
          <MainButton background="#4E514F">이메일로 회원가입</MainButton>
        </Link>
      </Container>
    </>
  );
};

export default LoginUser;
