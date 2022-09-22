import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainButton from "../components/common/Mainbutton";
import "./LoginUser.css";
import Header from "../components/Header";
import axios from "axios";

const LoginUser = () => {
  const [kakaoURL, setKakaoURL] = useState("");
  const [naverURL, setNaverURL] = useState("");

  useEffect(() => {
    // Oauth 로그인 요청 url 받아오기
    const getOauthURL = async () => {
      try {
        await axios.get("/auth/login").then((res) => {
          // console.log("res>>"+JSON.stringify(res));
          setKakaoURL(res.data.kakao);
          setNaverURL(res.data.naver);
        });
      } catch (e) {
        console.log(e);
      }
    };
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
      <div className="logoContainer"></div>

      <div className="buttonContainer">
        <div className="kakao" onClick={onKakao}>
          <span>카카오로 로그인</span>
        </div>
        <div className="naver" onClick={onNaver}>
          <span>네이버로 로그인</span>
        </div>

        <Link to="/login">
          <MainButton
            radius="15px"
            color="#FFFFFF"
            background="#4E514F"
            text="이메일로 로그인"
          />
        </Link>
        <div style={{ marginTop: "240px" }}>
          <Link to="/signupUser">
            <MainButton
              radius="15px"
              color="#FFFFFF"
              background="#4E514F"
              text="이메일로 회원가입"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
