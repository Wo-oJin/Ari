import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "../components/common/Container";
import { MainButton } from "../components/common/Button";

const LoginStore = () => {
  return (
    <>
      <Header text="로그인/회원가입" back={true}></Header>
      <div className="logoContainer"></div>
      <Container>
        <Link to="/login">
          <MainButton background="#4E514F" marginBottom="0">
            이메일로 로그인
          </MainButton>
        </Link>
        <div style={{ marginBottom: "11px" }}></div>
        <Link to="/signupOwner">
          <MainButton background="#4E514F" marginBottom="0">
            이메일로 회원가입
          </MainButton>
        </Link>
      </Container>
    </>
  );
};

export default LoginStore;
