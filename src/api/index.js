import axios, { AxiosInstance, AxiosError } from "axios";

// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API base URL
    timeout: 30000, // Adjust timeout as needed
});

// Function to set the authentication token in the request headers from localStorage
const setAuthTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};

// Call the function to set the token initially
setAuthTokenFromLocalStorage();

// Interceptor to handle authentication errors or token expiration
axiosInstance.interceptors.response.use(
    (response) => {
        // Return a successful response
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                window.location.href = "/login";
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
