import axios from "axios";
import _routes from "./service-routes";

const token = localStorage.getItem("auth-token");

axios.interceptors.request.use(function (config) {
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
},
  function (error) {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     return axios_instance(config);
    //   }

    //   if (error.response.status === 'ANOTHER_STATUS_CODE') {
    //     return Promise.reject(error.response.data);
    //   }
    // }
    return Promise.reject(error);
  })
  ;

const service = {
  setPageTitle: (component) => document.title = `Bug Tracker - ${component}`,

  browserHeight: () => window.innerHeight - 100,
  isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),

  doLogin: async (postBody) => {
    const res = await axios.post(_routes.login, postBody)
    return res.data
  },

  handleLoginError: (err, callback) => {
    if (err.response.status === 401)
      callback("Incorrect email or password");
  },

  doRegister: async (postBody) => {
    const res = await axios.post(_routes.register, postBody)
    return res.data
  },

  handleRegisterError: (err, callback) => {
    callback("Email already in use");
  },

  createProject: async (postBody) => {
    const res = await axios.post(_routes.projects, postBody)
    return res.data
  },

}

export default service;