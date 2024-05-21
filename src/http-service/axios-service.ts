import { AxiosInstance } from "axios";
import { createAxios } from "./axios-config";
import { GetAPIProps, PostAPIProps } from "../utils/Types";

let axios: AxiosInstance;

export const setAxiosBaseUrl = (apiUrl: string) => {
  axios = createAxios(apiUrl);
};

export const getAPI = async ({ url, token }: GetAPIProps) => {
  const headers: Record<string, string> = { Accept: "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const params: Record<string, string | number | undefined> = {};
  const response = await axios.get(url, { headers, params });
  return response;
};

export const postAPI = async ({ url, payload, token }: PostAPIProps) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await axios.post(url, payload, {
    headers,
  });
  return response;
};
