import "./Job.css";
import useJobQuery from "../../Services/useJobQuery";
import { Link } from "react-router-dom";


export type JobCard = {
  jobId: number;
  jobTitle: string;
  job_description: string;
  location: string;
};
const Job = (props: JobCard) => {
  const { jobId, jobTitle, job_description, location } = props;
  const Job = (jobId: number) => useJobQuery(jobId);
  return (
    <Link to={`/jobs/${jobId}`}>
      <button onClick={() => Job(jobId)}>
        <div className="job-listing-container">
          <div className="job-title">{jobTitle}</div>
          <div className="job-description">{job_description}</div>
          <div className="job-location">{location}</div>
        </div>
      </button>
    </Link>
  );
};

export default Job;
