import axios from "axios";

export const reissue = async () => {
    try {
        const response = await axios.post(
            "/auth/reissue",
            {
                accessToken: localStorage.getItem("accessToken"),
                refreshToken: localStorage.getItem("refreshToken"),
            }
        );

        const { accessToken, refreshToken, refreshTokenExpiresIn } = response.data.data;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 테스트로 일단 둘 다 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // accessToken 만료하기 1분 전에 로그인 연장
        const a = setTimeout(reissue, parseInt(refreshTokenExpiresIn - 60000));
        clearTimeout(a);

        return response.data;
    } catch (e) {
        console.log(e);
    }
};