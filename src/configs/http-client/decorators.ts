import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export const createHttpInstance = (configs: CreateAxiosDefaults) =>
  axios.create(configs);

export const withErrorHandler = (
  httpInstance: AxiosInstance
): AxiosInstance => {
  httpInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      //GLOBAL ERROR HANDLER
      return Promise.reject(error);
    }
  );

  return httpInstance;
};

export const withAuth = (httpInstance: AxiosInstance): AxiosInstance => {
  if (typeof window !== 'undefined') {
    // httpInstance.interceptors.request.use((config) => {
    //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    //   return config;
    // });

    httpInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.status === 401 || error?.response?.status === 401) {
          //TODO REMOVE TOKEN
        }
        return Promise.reject(error);
      }
    );
  }

  return httpInstance;
};
