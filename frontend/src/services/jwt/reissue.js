import axios from "axios";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../../state";
import Cookies from "universal-cookie";

export const Reissue = async () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(nameState);

  const cookies = new Cookies();
  // console.log("refreshToken>>" + cookies.get("refreshToken"));
  try {
    await axios
      .post("/auth/reissue", {
        accessToken: cookies.get("accessToken"),
        refreshToken: cookies.get("refreshToken"),
      })
      .then((res) => {
        if (res.data.result === "fail") {
          console.log(res.data.massage);
          // recoil persist로 저장된 변수 초기화
          setAuth(0);
          setName("");
        } else {
          console.log(res.data.massage);
        }

        const {
          accessToken,
          refreshToken,
          refreshTokenExpireIn,
          accessTokenExpireIn,
        } = res.data.data;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // 토큰을 secure http only 쿠키에 저장
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
        setTimeout(() => Reissue, parseInt(accessTokenExpireIn - 60000));
      });
  } catch (e) {
    console.log(e);
  }
};
