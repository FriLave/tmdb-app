import axios, { AxiosInstance } from "axios";

export const httpClient: AxiosInstance = axios.create({
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
