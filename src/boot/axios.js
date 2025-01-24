// // import { boot } from "quasar/wrappers";
// import axios from "axios";

// // Be careful when using SSR for cross-request state pollution
// // due to creating a Singleton instance here;
// // If any client changes this (global) instance, it might be a
// // good idea to move this instance creation inside of the
// // "export default () => {}" function below (which runs individually
// // for each client)
// // const api = axios.create({ baseURL: "https://www.thunderclient.com/" });

// // export default boot(({ app }) => {
// // for use inside Vue files (Options API) through this.$axios and this.$api

// // app.config.globalProperties.$axios = axios;
// // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
// //       so you won't necessarily have to import axios in each vue file

// // app.config.globalProperties.$api = api;
// // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
// //       so you can easily perform requests against your app's API
// // });

// // export default { api };

import axios from "axios";
import { LocalStorage } from "quasar";
import baseUrl from "../config/index";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: baseUrl.baseUrl,
  headers: {
    Accept: "*/*",
  },
});

// Add a request interceptor to dynamically inject the token
axiosInstance.interceptors.request.use(
  (config) => {
    const loginObject = JSON.parse(LocalStorage.getItem("login"));
    const token = loginObject?.login?.token || null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Remove the header if no token
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired; handle it (e.g., redirect to login)
      console.error("Unauthorized. Redirecting to login...");
      window.location.href = "/login"; // Or use your router to navigate
    }
    return Promise.reject(error);
  }
);

// Create a specialized instance for login (no token required)
const axiosLogin = axios.create({
  baseURL: baseUrl.baseUrl,
});

// Create another instance for multipart form data requests
const axiosFormPost = axios.create({
  baseURL: baseUrl.baseUrl,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

// Add the same request interceptor to axiosFormPost
axiosFormPost.interceptors.request.use(
  (config) => {
    const loginObject = JSON.parse(LocalStorage.getItem("login"));
    const token = loginObject?.login?.token || null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosLogin, axiosFormPost };

