import axios from "axios";

export const createAxios = (baseURL: string) => {
  const axiosInstance = axios.create({ baseURL });
  return axiosInstance;
};
