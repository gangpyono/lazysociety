import useSWR from "swr";

import { getuserlist } from "../lib/user.js";

const useUserList = () => {
  const { data, error } = useSWR(`/api/user/userlist`, getuserlist);

  return {
    data,
    isLoading: !data && !error,
    error,
  };
};

export default useUserList;
