import React from "react";
import "../App.css";
import "../styles/LoginRegister.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const LoginRequired = () => {
  const style = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={style}>
      <Header text="로그인/회원가입" back={true}></Header>
      <div className="loginRegisterContainer flexBox">
        <div className="loginRegisterContent">
          <div className="loginRegisterText">
            <p>로그인이 필요한 페이지입니다</p>
            <span>로그인을 통해</span>
            <span>우리 근처 제휴 정보를 확인하세요!</span>
          </div>
          <div className="mt-10">
            <Link to="/loginOwner">
              <button>사장님 로그인/회원가입</button>
            </Link>
          </div>
          <div className="mt-10">
            <Link to="/loginUser">
              <button>손님 로그인/회원가입</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
