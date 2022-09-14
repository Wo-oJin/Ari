import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const reissue = async () => {
  try {
    const response = await axios.post("/auth/reissue", {
      //accessToken: localStorage.getItem("accessToken"),
      refreshToken: cookies.get("refreshToken"),
    });

    const {
      accessToken,
      refreshToken,
      refreshTokenExpireIn,
      accessTokenExpireIn,
    } = response.data.data;

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

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
