import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { authState, nameState } from "../state";
import "../pages/Login.css";
import Header from "../components/Header";
import { reissue } from "../services/jwt/reissue";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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

    try {
      await axios
        .post("/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const {
            accessToken,
            refreshToken,
            refreshTokenExpireIn,
            accessTokenExpireIn,
          } = res.data.data;

          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정 : POST 요청 시
          // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          axios.interceptors.request.use(
            function (config) {
              // 요청 보내기 전에 Authrozation header 설정
              config.headers.Authorization = `Bearer ${accessToken}`;
              return config;
            },
            function (error) {
              // Do something with request error
              return Promise.reject(error);
            }
          );

          // refreshToken을 http only 쿠키에 저장
          cookies.set("refreshToken", refreshToken, {
            path: "/", // 모든 페이지에서 쿠키 사용
            expires: refreshTokenExpireIn, // 만료시간
            sameSite: false, // 모든 도메인에서 쿠키를 전송하고 사용
            secure: true, // HTTPS를 통해서만 접근
            httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
          });

          // accessToken 만료하기 1분 전에 로그인 연장
          const a = setTimeout(reissue, parseInt(accessTokenExpireIn - 60000));
          clearTimeout(a);

          console.log("로그인>>" + JSON.stringify(res.data));
          if (res.data.result === "fail") {
            // 로그인 실패
            alert(res.data.massage);
          } else {
            // 로그인 성공
            // 사용자 권한을 recoil 변수에 저장
            if (res.data.data.authority === "ROLE_USER") {
              // 손님
              setAuth(1);
            } else if (res.data.data.authority === "ROLE_OWNER") {
              // 사장
              setAuth(2);
            } else if (res.data.data.authority === "ROLE_ADMIN") {
              // 관리자
              setAuth(3);
            }

            setName(res.data.data.info); // recoil
            alert(res.data.massage);
            navigate("/"); // 메인 페이지로 이동
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="로그인" link="/loginRegister"></Header>
      <div className="logoContainer"></div>
      <form onSubmit={onSubmit}>
        <div className="inputContainer">
          <Formbox>
            <input
              className="inputBox"
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
            <input
              className="inputBox"
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
          <button
            className="loginButton"
            type="submit"
            disabled={email !== "" && password !== "" ? false : true}
          >
            로그인
          </button>
        </div>
        <div className="subContainer">
          <div className="login-subAlign">
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
