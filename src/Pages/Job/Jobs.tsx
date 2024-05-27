import { jobList } from "../../Services/JobPagination";
import Job from "./Job";
import { Card } from "../../utils/Types";
import { useEffect, useState } from "react";
const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [job, setJob] = useState<Card[]>([]);
  const postPerPage = 2;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobList();
        setJob(response.data);
      } catch (error) {
        console.log(error);
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
            onClick={() =>
              setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)
            }
            disabled={currentPage === 1}
          >
            Prev Page
          </button>
          <button
            onClick={() =>
              setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
            }
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
