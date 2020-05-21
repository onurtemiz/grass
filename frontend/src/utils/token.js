export let config = {
  headers: { Authorization: null },
};

export const setToken = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  };
};
