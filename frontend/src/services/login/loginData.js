import axios from "axios";

const POST_BASE_URL = "http://.../login";

export const loginData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
            }
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
};