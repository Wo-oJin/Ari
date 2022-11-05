import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const customAxios = axios.create();

customAxios.interceptors.request.use(
  function (config) {
    // 요청 보내기 전에 제어할 부분
    config.headers["Authorization"] = `Bearer ${cookies.get("accessToken")}`;
    return config;
  },
  function (error) {
    // 요청 시 에러 처리
    return Promise.reject(error);
  }
);
