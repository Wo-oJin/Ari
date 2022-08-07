import axios from "axios";

const POST_BASE_URL = "http://.../signupUser";

export const signUserData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL, { withCredentials: true },
            {
                email: inputData.email,
                password: inputData.password,
                nickname: inputData.nickname,
                age: inputData.age,
                gender: inputData.gender,
            }
        );
        return response.data;
    } catch (e) {
        console.error(e);
    }
};