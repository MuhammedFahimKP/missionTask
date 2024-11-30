import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CanceledError,
} from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default apiClient;
export type ApiClientRequestConfig = AxiosRequestConfig;
export type ApiClientError<T = any> = AxiosError<T>;
export type ApiClientResponse = AxiosResponse;
export { CanceledError as ApiClientCanceledError };
