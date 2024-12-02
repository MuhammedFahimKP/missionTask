import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CanceledError,
} from "axios";

import createAuthRefreshInterceptor from "axios-auth-refresh";

import { getState, dispatch } from "@/store";

import { setAccessToken, setSessionTimeOut } from "@/slices/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

console.log(baseURL);

const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use(async (config) => {
  const { access } = getState().persistedReducer.auth;

  if (access !== null) {
    config.headers.Authorization = "Bearer " + access;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  const { refresh } = getState().persistedReducer.auth;
  if (refresh !== null) {
    return axios
      .post(
        "token-refresh/",
        {
          refresh: refresh,
        },
        {
          baseURL: baseURL,
        }
      )
      .then((resp) => {
        const { access } = resp.data;
        if (failedRequest?.response) {
          failedRequest.response.config.headers.Authorization =
            "Bearer " + access;
        }
        dispatch(setAccessToken(access));
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          dispatch(setSessionTimeOut());
        }
      });
  }
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

export default apiClient;
export type ApiClientRequestConfig = AxiosRequestConfig;
export type ApiClientError<T = any> = AxiosError<T>;
export type ApiClientResponse = AxiosResponse;
export { CanceledError as ApiClientCanceledError };
