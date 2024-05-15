import axios from "axios";
import { Card } from "../Pages/Job/Job";
export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type User = {
  email: string;
  password?: string;
  token?: string;
};
export interface FormValues {
  fullName: string;
  email: string;
  resume: File | null;
  experience: string;
}

interface ApplyAttributes {
  JobJobId: Card | null;
  jobApplication: FormValues;
}

const userString = localStorage.getItem("user");
const users = userString ? JSON.parse(userString) : null;

export const addContact = async (contact: ContactFormValues) => {
  return await axios.post("http://localhost:8080/postContact", contact, {
    headers: {
      Authorization: `Bearer ${users.token}`,
    },
  });
};

export const addUser = (user: User) => {
  return axios.post("http://localhost:8080/auth/create-user", user);
};

export const loginUser = (user: User) => {
  return axios.post("http://localhost:8080/auth/login", user);
};

export const apply = (data: ApplyAttributes) => {
  console.log(users.token);
  return axios.post(`http://localhost:8080/apply`, data, {
    headers: {
      Authorization: `Bearer ${users.token}`,
    },
  });
};
