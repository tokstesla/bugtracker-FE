import axios from "axios";
import _routes from "./service-routes";

const token = localStorage.getItem("auth-token");

axios.interceptors.request.use(
  (config) => {
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const service = {
  setPageTitle: (component) => (document.title = `Bug Tracker - ${component}`),

  browserHeight: () => window.innerHeight - 100,
  isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),

  getPayload: () => {
    const token = localStorage.getItem("auth-token");
    if (token !== null) {
      const { role, user_id } = JSON.parse(atob(token.split(".")[1]));
      return { role, user_id };
    }
  },

  doLogin: async (postBody) => {
    const res = await axios.post(_routes.login, postBody);
    return res.data;
  },

  handleLoginError: (err, callback) => {
    if (err.response.status === 401) callback("Incorrect email or password");
  },

  doRegister: async (postBody) => {
    const res = await axios.post(_routes.register, postBody);
    return res.data;
  },

  handleRegisterError: (err, callback) => {
    callback("Email already in use");
  },

  createProject: async (postBody) => {
    const res = await axios.post(
      `${_routes.projects}/${service.getPayload().user_id}/projects`,
      postBody
    );
    return res.data;
  },

  getAllProjects: async () => {
    const res = await axios.get(
      `${_routes.projects}/${service.getPayload().user_id}/projects`
    );
    return res.data;
  },
};

export default service;
