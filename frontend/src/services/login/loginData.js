import axios from "axios";

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
        // console.log("response>>"+JSON.stringify(response));
        const { accessToken } = response.data.data;
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        // console.log("accessToken>>"+accessToken);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

		// accessToken을 localStorage, cookie 등에 저장하지 않는다!

        return response.data;
    } catch (e) {
        console.log(e);
    }
};