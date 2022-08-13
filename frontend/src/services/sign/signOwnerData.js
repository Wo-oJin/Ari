import axios from "axios";

const POST_BASE_URL = "/auth/signup-owner";

export const signOwnerData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
                nickname: inputData.nickname,
                storeCode: inputData.storeCode,
            }
        );
        return response.data;
    } catch (e) {
        console.error(e);
    }
};