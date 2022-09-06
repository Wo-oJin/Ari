import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginData } from "../services/login/loginData";
import { authState, nameState } from "../state";
import "../pages/Login.css";
import Header from '../components/Header';

const Formbox = styled.div`
  position: relative;
  margin-bottom: 20px;
  .message {
    font-size: 11px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -10px;
    left: 0;
    &.success {
      color: #8f8c8b;
    }
    &.error {
      color: #ff2727;
    }
  }
`;

const Login = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await loginData({
      email: email,
      password: password,
    });
    console.log("로그인>>"+JSON.stringify(result));
    // if (result.result === "fail") { // 로그인 실패
    //     alert(result.massage);
    // } else { // 로그인 성공

    //   // 사용자 권한을 recoil 변수에 저장
    //   if (result.data.authority === "ROLE_USER") { // 손님
    //     setAuth(1);
    //   } else if (result.data.authority === "ROLE_OWNER") { // 사장
    //     setAuth(2);
    //   } else if (result.data.authority === "ROLE_ADMIN") { // 관리자
    //     setAuth(3);
    //   }

    //   setName(result.data.info); // recoil
    //   alert(result.massage);
    //   navigate("/"); // 메인 페이지로 이동
    // }
  };

  return (
    <>
      <Header text="로그인" link="/loginRegister"></Header>
      <div className="logoContainer"></div>
      <form onSubmit={onSubmit}>
        <div className="inputContainer">
          <Formbox>
            <input className="inputBox"
              name="email"
              value={email}
              type="email"
              onChange={onChange}
              placeholder="이메일 주소 입력"
              required
              autoComplete="off"
            />
          </Formbox>
          <Formbox>
            <input className="inputBox"
              name="password"
              value={password}
              type="password"
              onChange={onChange}
              placeholder="비밀번호 입력"
              required
              autoComplete="off"
            />
          </Formbox>
        </div>
        <div className="buttonContainer">
          <button className="loginButton"
            type="submit"
            disabled={email !== "" && password !== "" ? false : true}>
            로그인
          </button>
        </div>
        <div className="subContainer">
          <div className="subAlign">
            <Link to="/loginRegister">
              <span style={{ marginRight: "16px" }}>이메일 회원가입</span>
            </Link>
            <span>비밀번호 찾기</span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
