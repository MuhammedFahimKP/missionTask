import { useEffect, useState } from "react";

import apiClient, {
  ApiClientCanceledError,
  ApiClientResponse,
  ApiClientRequestConfig,
  ApiClientError,
} from "@/services/api-client";

const useData = <T>(
  endpoint: string,
  delay = 0,
  requestConfig?: ApiClientRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      setTimeout(() => {
        apiClient
          .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
          .then((res: ApiClientResponse) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof ApiClientCanceledError) return;
            alert(err);
            if ((err as ApiClientError)?.status) {
              setError(err.status);
            }
            setLoading(false);
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading, setData };
};

export default useData;
