import { Card } from "../Pages/Job/Job";
import axios from "axios";

export const fetchJobs = async (page: number): Promise<Card[]> => {
  const res = await axios.get(`http://localhost:8080/allJobs`, {
    params: {
      _limit: 3,
      _page: page,
    },
  });

  return res.data;
};
