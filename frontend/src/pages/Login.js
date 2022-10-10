import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import styled from "styled-components";
import axios from "axios";
import "../pages/Login.css";
import Header from "../components/Header";
import { useReissue } from "../services/jwt/useReissue";
import Cookies from "universal-cookie";

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

  const { reissue } = useReissue();

  const cookies = new Cookies();

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
          console.log("로그인>>" + JSON.stringify(res.data));
          if (res.data.result === "fail") {
            // 로그인 실패
            alert(res.data.massage);
          } else {
            // 로그인 성공
            const {
              accessToken,
              refreshToken,
              refreshTokenExpireIn,
              accessTokenExpireIn,
            } = res.data.data;

            // 쿠키 사용 설정
            axios.defaults.withCredentials = true;

            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정 : 모든 컴포넌트의 요청에서 전역으로 설정되지 않고 있음
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            // 토큰을 http only 쿠키에 저장
            cookies.set("refreshToken", refreshToken, {
              path: "/", // 모든 페이지에서 쿠키 사용
              maxAge: refreshTokenExpireIn, // 쿠키의 만료 시간을 밀리초 단위로 설정
              // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
              // secure: true, // HTTPS를 통해서만 접근
              // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
              // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
            });

            cookies.set("accessToken", accessToken, {
              path: "/", // 모든 페이지에서 쿠키 사용
              maxAge: accessTokenExpireIn, // 쿠키의 만료 시간을 밀리초 단위로 설정
              // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
              // secure: true, // HTTPS를 통해서만 접근
              // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
              // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
            });

            // accessToken 만료하기 1분 전에 로그인 연장
            setTimeout(() => reissue(), parseInt(accessTokenExpireIn - 60000));

            // 사용자 권한을 recoil 변수에 저장
            if (res.data.data.authority === "ROLE_USER") {
              // 손님
              setAuth(1);
            } else if (res.data.data.authority === "ROLE_USER2") {
              //베타 테스트용 손님2
              setAuth(4);
            } else if (res.data.data.authority === "ROLE_OWNER") {
              // 사장
              setAuth(2);
            } else if (res.data.data.authority === "ROLE_ADMIN") {
              // 관리자
              setAuth(3);
            }

            setName(res.data.data.info); // recoil
            // alert(res.data.massage);
            navigate("/"); // 메인 페이지로 이동
            window.location.reload();
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="로그인" back={true}></Header>
      <div className="logoContainer"></div>
      <form onSubmit={onSubmit}>
        <div className="login-inputContainer">
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
        <div className="login-subAlign">
          <div className="login-sub-menu">
            <Link to="/loginRegister">
              <span>이메일 회원가입</span>
            </Link>
            <Link to="/findPassword">
              <span>비밀번호 찾기</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
