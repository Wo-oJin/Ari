import axios from "axios";

const POST_BASE_URL = "/auth/signup-owner";

export const signOwnerData = async (inputData) => {
    try {
        const response = await axios.post(
            POST_BASE_URL,
            {
                email: inputData.email,
                password: inputData.password,
                age: inputData.age,
                gender: inputData.gender,
                storeName: inputData.storeName,
                ownerName: inputData.ownerName,
                categoryCode: "01",
                storeRoadAddress: inputData.storeRoadAddress,
                storeDetailAddress: inputData.storeDetailAddress,
                phoneNumber: inputData.phoneNumber,
            },
            { withCredentials: true },
        );
        return response.data;
    } catch (e) {
        console.error(e);
    }
};