import axios from "axios";
import { reissue } from '../jwt/reissue';

const POST_BASE_URL = "/auth/login";

export const loginData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
            }
        );

        const { accessToken, refreshToken, accessTokenExpireIn } = response.data.data;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 일단 둘 다 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // accessToken 만료하기 1분 전에 로그인 연장
        const a = setTimeout(reissue, parseInt(accessTokenExpireIn - 60000));
        clearTimeout(a);

        return response.data;
    } catch (e) {
        console.log(e);
    }
};