// import { AxiosInstance } from "axios";
// import { createAxios } from "./axios-config";
import { GetAPIProps, PostAPIProps } from "../../utils/Types";
import axiosInstance from "./axios-config";

export const getAPI = async ({ url }: GetAPIProps) => {
  const params: Record<string, string | number | undefined> = {};
  const response = await axiosInstance.get(url, { params });
  return response;
};

export const postAPI = async ({ url, payload }: PostAPIProps) => {
  const response = await axiosInstance.post(url, payload, {});
  return response;
};
