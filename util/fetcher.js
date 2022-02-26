import axios from "axios";

const fetcher = async (url, method, ...rest) => {
  const res = await axios[method](url, ...rest);
  return res.data;
};

export default fetcher;
