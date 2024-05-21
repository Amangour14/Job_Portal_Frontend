import { getAPI } from "../http-service/axios-service";

export const jobList = async () => {
  const jobs = await getAPI({ url: "/allJobs" });
  return jobs;
};
