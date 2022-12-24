import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import axios from "axios";
import Header from "../components/Header";
import { useReissue } from "../services/jwt/useReissue";
import Cookies from "universal-cookie";
import { Logo } from "../components/common/Logo";
import { Container } from "../components/common/Container";
import Formbox from "../components/common/FormBox";
import { Input } from "../components/common/Input";
import { MainButton } from "../components/common/Button";
import { LoginSubMenu } from "../components/login/LoginStyle";

const Login = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const { reissue } = useReissue();
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== 0) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, []);

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
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (data.result === "fail") {
        // 로그인 실패
        alert(data.massage);
      } else {
        // 로그인 성공
        const {
          accessToken,
          refreshToken,
          refreshTokenExpiresIn,
          accessTokenExpireIn,
        } = data.data;

        // 쿠키 사용 설정
        axios.defaults.withCredentials = true;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // 토큰을 http only 쿠키에 저장 -> https인 경우에만 설정 가능
        cookies.set("refreshToken", refreshToken, {
          path: "/", // 모든 페이지에서 쿠키 사용
          maxAge: 60 * 60 * 24 * 30 * 12, // 쿠키의 만료 시간을 초 단위로 설정, 약 1년
          // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
          // secure: true, // HTTPS를 통해서만 접근
          // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
          // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
        });

        cookies.set("accessToken", accessToken, {
          path: "/", // 모든 페이지에서 쿠키 사용
          maxAge: accessTokenExpireIn, // 쿠키의 만료 시간을 초 단위로 설정
          // sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
          // secure: true, // HTTPS를 통해서만 접근
          // domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
          // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
        });

        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(() => reissue(), parseInt(accessTokenExpireIn - 60000));

        // 사용자 권한을 recoil 변수에 저장
        if (data.data.authority === "ROLE_USER") {
          // 손님
          setAuth(1);
        } else if (data.data.authority === "ROLE_USER2") {
          //베타 테스트용 손님2
          setAuth(4);
        } else if (data.data.authority === "ROLE_OWNER") {
          // 사장
          setAuth(2);
        } else if (data.data.authority === "ROLE_ADMIN") {
          // 관리자
          setAuth(3);
        }

        setName(data.data.info); // recoil
        // alert(res.data.massage);
        navigate("/"); // 메인 페이지로 이동
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header text="로그인" back={true}></Header>
      <Logo />
      <form onSubmit={onSubmit}>
        <Container>
          <Formbox>
            <Input
              name="email"
              value={email}
              type="email"
              onChange={onChange}
              placeholder="이메일 주소 입력"
              required={true}
              fontSize="16px"
            />
          </Formbox>
          <Formbox>
            <Input
              name="password"
              value={password}
              type="password"
              onChange={onChange}
              placeholder="비밀번호 입력"
              required={true}
              fontSize="16px"
            />
          </Formbox>
        </Container>
        <Container>
          <MainButton
            fontSize="18px"
            type="submit"
            disabled={email !== "" && password !== "" ? false : true}
          >
            로그인
          </MainButton>
        </Container>
        <LoginSubMenu>
          <Link to="/loginRegister">
            <span>이메일 회원가입</span>
          </Link>
          <Link to="/findPassword">
            <span>비밀번호 찾기</span>
          </Link>
        </LoginSubMenu>
      </form>
    </>
  );
};

export default Login;
