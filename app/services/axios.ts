import axios from "axios";

const config = {
    headers: {
        "content-Type": "application/json",
        Accept: "application/json",
    },
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(`ERROR: ${error.config.method?.toLocaleUpperCase()} - ${error.config.url}`);
        return Promise.reject(error);
    }
);

export default axiosInstance;
