import API from "./index";
import { getToken, setToken } from "../controller/tokenController.js";

export const getAuth = async (data) => {
  const res = await API.post("/api/auth/sign-in", data);

  return res.data;
};

export const setAccessToken = async () => {
  const refreshToken = getToken("refreshToken");
  const res = await API.post("/api/auth/access-token", { refreshToken });
  const newToken = res.data.accessToken;
  setToken("accessToken", newToken);
};
