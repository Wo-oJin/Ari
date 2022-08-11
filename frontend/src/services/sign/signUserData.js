import axios from "axios";

const POST_BASE_URL = "/auth/signup-user";

export const signUserData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
                nickname: inputData.nickname,
                age: inputData.age,
                gender: inputData.gender,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (e) {
        console.error(e);
    }
};