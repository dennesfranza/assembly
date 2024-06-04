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

let login_object = JSON.parse(LocalStorage.getItem("login"))

console.log(login_object)

let token =
    login_object === null
    ? "X"
    : login_object.login.token;

console.log(token)

const axiosInstance = axios.create({
  baseURL: baseUrl.baseUrl,
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  },
});

const axiosLogin = axios.create({
  baseURL: baseUrl.baseUrl,
});

const axiosFormPost = axios.create({
  baseURL: baseUrl.baseUrl,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export { axiosInstance, axiosLogin, axiosFormPost };
