import { setAccessToken } from "../accessToken";
import API from "../index";

export const getUser = async (url, token) => {
  try {
    const res = await API.get(url, { headers: { authorization: token } });
    return res.data;
  } catch (error) {
    if (error.response.data.msg === "로그인후 이용가능한 서비스 입니다.") {
      throw error;
    }

    if (error.response.data.msg === "토큰이 만료되었습니다.") {
      await setAccessToken();
      return;
    }

    console.log(error.response, "마지막");
  }
};
