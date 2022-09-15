import Cookies from "universal-cookie";

export const token = () => {
  const cookies = new Cookies();

  const getAccessToken = () => {
    return cookies.get("accessToken");
  };

  const getRefreshToken = () => {
    return cookies.get("refreshToken");
  };

  return { getAccessToken, getRefreshToken };
};
