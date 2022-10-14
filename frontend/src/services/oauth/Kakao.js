import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../../state";
import { useReissue } from "../jwt/useReissue";
import Cookies from "universal-cookie";

const Kakao = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const { reissue } = useReissue();

  const cookies = new Cookies();

  const navigate = useNavigate();

  useEffect(() => {
    // url 파라미터로 인가코드 받아오기
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const state = params.get("state");

    const sendCode = async () => {
      try {
        await axios
          .post("/auth/kakao/login", {
            code: code,
            state: state,
          })
          .then((res) => {
            console.log("소셜 로그인>>" + JSON.stringify(res.data));
            if (res.data.state === 400) {
              // from_oauth 값에 따라 다른 메시지 띄우기
              alert(res.data.massage);
              navigate("/"); // 메인 페이지로 이동
            } else {
              const {
                accessToken,
                refreshToken,
                refreshTokenExpiresIn,
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
                maxAge: 60 * 60 * 24 * 30 * 12, // 쿠키의 만료 시간을 초 단위로 설정
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
              setTimeout(
                () => reissue(),
                parseInt(accessTokenExpireIn - 60000)
              );

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
              // alert(res.data.massage);
              navigate("/"); // 메인 페이지로 이동
              window.location.reload(); // 요청에 토큰값이 반영될 수 있도록 함
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    sendCode();
  }, []);

  return <>로딩중...</>;
};

export default Kakao;
