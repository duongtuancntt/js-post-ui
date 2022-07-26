import axios from "axios";

const axiosCLient = axios.create({
  baseURL: "https://js-post-api.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosCLient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("access_token");
    // if(ac)
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosCLient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("axiosClient", error.response);
    if (!error.response)
      throw new Error("Network error. Please try again later.");

    if (error.response.status === 401) {
      window.location.assign("/login.html");
    }
    return Promise.reject(error);
  }
);

export default axiosCLient;
