const axios = require('axios');
const createAxiosInstance = (BASE_URL) => {
  const commonAxios = axios.create({
    baseURL: `${BASE_URL}`,
  });

  // Optional: Add an interceptor for Authorization headers
//   commonAxios.interceptors.request.use(
    // (config) => {
    //   const token = localStorage.getItem('token'); // Example for token retrieval
    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
    //   return config;
    // },
    // (error) => {
    //   return Promise.reject(error);
    // }
//   );

  return commonAxios;
};

module.exports = createAxiosInstance;
