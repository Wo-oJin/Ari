import { React } from "react";
import { Link } from "react-router-dom";
// import kakaoLogo from "../public/images/Kakao_Logo.png";
// import naverLogo from "../public/images/Naver_Logo.png";
import MainButton from "../components/common/Mainbutton";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;

const LoginUser = () => {
  return (
    <>
      <ButtonContainer>
        <MainButton
          radius="15px"
          color="#181600"
          background="#FEE500"
          text="카카오로 로그인"
        />
        <MainButton
          radius="15px"
          color="#FFFFFF"
          background="#03C75A"
          text="네이버로 로그인"
        />
        <Link to="/login">
          <MainButton
            radius="15px"
            color="#FFFFFF"
            background="#4E514F"
            text="이메일로 로그인"
          />
        </Link>
      </ButtonContainer>
      <SignupContainer>
        <Link to="/signupUser">
          <MainButton
            radius="15px"
            color="#FFFFFF"
            background="#4E514F"
            text="이메일로 회원가입"
          />
        </Link>
      </SignupContainer>
    </>
  );
};

export default LoginUser;
