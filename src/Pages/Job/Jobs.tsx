import { jobList } from "../../Services/JobPagination";
import Job from "./Job";
import { Card } from "../../utils/Types";
import { useEffect, useState } from "react";
const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [job, setJobs] = useState<Card[]>([]);
  const postPerPage = 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobList();
        setJobs(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const indexOfLastJob = currentPage * postPerPage;
  const indexOfFirstJob = indexOfLastJob - postPerPage;
  const currentJobs = job.slice(indexOfFirstJob, indexOfLastJob);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          margin: "10px",
        }}
      >
        {currentJobs.map((item) => (
          <div key={item.jobId}>
            <Job
              jobId={item.jobId}
              jobTitle={item.jobTitle}
              job_description={item.job_description}
              location={item.location}
            />
          </div>
        ))}
      </div>
      <div>
        <center>
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev Page
          </button>
          <button
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            disabled={postPerPage * currentPage >= job.length}
          >
            Next
          </button>
        </center>
      </div>
    </>
  );
};

export default Jobs;
