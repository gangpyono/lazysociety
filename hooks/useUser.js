import useSWR from "swr";

import { getToken, deleteToken } from "../controller/tokenController";
import { getUser } from "../lib/user";
import { useRouter } from "next/router";

const useUser = () => {
  const token = getToken("accessToken");
  const router = useRouter();

  const { data, error } = useSWR(token ? ["/api/user/userinfo", token] : null, getUser, {
    // accessToken만료시 재요청.
    errorRetryInterval: 100,
    errorRetryCount: 1,
  });

  if (error?.response.data.msg === "이용시간이 초과되었습니다.") {
    //로그인페이지로
    deleteToken("accessToken");
    deleteToken("refreshToken");
    router.push("/login");
  }

  return {
    data,
    isLoading: !data && !error,
    error,
  };
};

export default useUser;
