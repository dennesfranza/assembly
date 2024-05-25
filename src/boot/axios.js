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

// const request = (method, uri, data = null) => {
//   if (!method) {
//     return;
//   }
//   if (!uri) {
//     return;
//   }
//   const url = "http://localhost:8000/" + uri;
//   return axios({
//     method,
//     url,
//     data,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//       "Authorization": ''
//     },
//   });
// };

// export default {
//   request,
// };

import axios from "axios";
import { LocalStorage } from "quasar";

let token =
  LocalStorage.getItem("user") === null
    ? "X"
    : LocalStorage.getItem("user").token;

console.log(token)

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  },
});

const axiosLogin = axios.create({
  baseURL: "http://localhost:8000",
});

export { axiosInstance, axiosLogin };
