export const setToken = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getToken = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key));
  }
  return null;
};

export const deleteToken = (key) => {
  window.localStorage.removeItem(key);
};
