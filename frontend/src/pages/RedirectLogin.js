import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import axios from "axios";
import { reissue } from "../services/jwt/reissue";
import Cookies from "universal-cookie";

const RedirectLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const cookies = new Cookies();

  const navigate = useNavigate();

  useEffect(() => {
    // url 파라미터로 전달된 데이터 받아오기
    const params = new URL(window.location.href).searchParams;
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const refreshTokenExpireIn = params.get("refreshTokenExpireIn");
    const accessTokenExpireIn = params.get("accessTokenExpireIn");
    const authority = params.get("authority");
    const info = params.get("info");
    const loginFail = params.get("loginFail");

    if (loginFail === "true") {
      alert("로그인에 실패하였습니다.");
      navigate("/loginUser");
      return false;
    }

    // 쿠키 사용 설정
    axios.defaults.withCredentials = true;

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // 토큰을 http only 쿠키에 저장
    cookies.set("refreshToken", refreshToken, {
      path: "/", // 모든 페이지에서 쿠키 사용
      maxAge: refreshTokenExpireIn, // 쿠키의 만료 시간을 밀리초 단위로 설정
      sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
      secure: true, // HTTPS를 통해서만 접근
      domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
      // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
    });

    cookies.set("accessToken", accessToken, {
      path: "/", // 모든 페이지에서 쿠키 사용
      maxAge: accessTokenExpireIn, // 쿠키의 만료 시간을 밀리초 단위로 설정
      sameSite: "none", // 모든 도메인에서 쿠키를 전송하고 사용
      secure: true, // HTTPS를 통해서만 접근
      domain: "localhost", // secure 옵션을 사용하면 같은 도메인을 공유해야 함
      // httpOnly: true, // 서버에서만 쿠키에 접근, 브라우저에서 접근 불가
    });

    // accessToken 만료하기 1분 전에 로그인 연장
    const a = setTimeout(reissue, parseInt(accessTokenExpireIn - 60000));
    clearTimeout(a);

    // 사용자 권한을 recoil 변수에 저장
    if (authority === "ROLE_USER") {
      // 손님
      setAuth(1);
    } else if (authority === "ROLE_OWNER") {
      // 사장
      setAuth(2);
    } else if (authority === "ROLE_ADMIN") {
      // 관리자
      setAuth(3);
    }

    setName(info); // recoil

    alert("로그인에 성공했습니다.");
    navigate("/"); // 메인 페이지로 이동
  }, []);

  return <>로딩중... 잠시만 기다려주세요.</>;
};

export default RedirectLogin;
