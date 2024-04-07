import axios, { AxiosInstance } from "axios";
import { notFound } from "next/navigation";

export const httpClient: AxiosInstance = axios.create({
  baseURL: typeof window === "undefined" ? "http://localhost:3000" : window.location.origin,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 404) {
      console.log('error', error.response?.status);
      return notFound();
    }

    return Promise.reject(error);
  },
);
