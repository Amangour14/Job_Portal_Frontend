import axios from "axios";
import { ApplyAttributes } from "../utils/Types";

const userString = localStorage.getItem("user");
const users = userString ? JSON.parse(userString) : null;
export const apply = (data: ApplyAttributes) => {
  return axios.post(`http://localhost:8080/apply`, data, {
    headers: {
      Authorization: `Bearer ${users.token}`,
    },
  });
};
