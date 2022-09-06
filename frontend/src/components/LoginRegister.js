import React from "react";
import "../App.css";
import "../styles/LoginRegister.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const LoginRegister = () => {
  const style = {
    width: "100%",
    height: "100%",
  };
  const marginTop = {
    marginTop: "35px",
  };
  return (
    <div style={style}>
      <Header text="로그인/회원가입" back={true}></Header>
      <div className=" loginRegisterContainer flexBox">
        <div className="loginRegisterContent">
          <div className="loginRegisterText">
            <p>아리에 오신 것을 환영합니다</p>
            <span>제휴 정보를 나누고</span>
            <span>실시간 제휴 현황까지 확인해보세요!</span>
          </div>
          <Link to="/loginOwner">
            <button style={marginTop}>사장님 로그인/회원가입</button>
          </Link>

          <Link to="/loginUser">
            <button>손님 로그인/회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
