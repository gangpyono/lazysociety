import { setAccessToken } from "./auth";
import API from "./index";

export const getUser = async (url, token) => {
  try {
    const res = await API.get(url, { headers: { authorization: token } });

    return res.data;
  } catch (error) {
    if (error.response.data.msg === "토큰이 만료되었습니다.") {
      await setAccessToken();
      return;
    }
    throw error;
  }
};

export const getuserlist = async (url, config = "") => {
  const res = await API.get(url, config);

  return res.data;
};
