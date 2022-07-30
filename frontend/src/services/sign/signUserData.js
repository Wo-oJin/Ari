import axios from "axios";

const POST_BASE_URL = "http://.../signupUser";

export const signUserData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
                nickname: inputData.nickname,
                birthday: inputData.birthday,
            }
        );
        return response.data;
    } catch (e) {
        console.error(e);
    }
};