import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const customAxios = axios.create({
  headers: {
    Authorization: `Bearer ${cookies.get("accessToken")}`,
  },
});
