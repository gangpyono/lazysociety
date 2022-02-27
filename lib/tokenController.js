export const setToken = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getToken = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || "";
};
