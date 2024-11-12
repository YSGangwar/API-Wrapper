const axios = require('axios');
const createAxiosInstance = (BASE_URL) => {
  const commonAxios = axios.create({
    baseURL: `${BASE_URL}`,
  });

  return commonAxios;       
};

module.exports = createAxiosInstance;
