import axios from "axios";
import { useQuery } from "react-query";
import { Card } from "../utils/Types";
const fetchJobById = async (id: number): Promise<Card> => {
  const response = await axios.get(`http://localhost:8080/job/${id}`);
  return response.data;
};

const useJobQuery = (id: number) => {
  return useQuery<Card, Error>(["job", id], () => fetchJobById(id));
};

export default useJobQuery;
