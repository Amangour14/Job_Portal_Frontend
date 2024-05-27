import "./Job.css";
import { useNavigate } from "react-router-dom";
export type JobCard = {
  jobId: number;
  jobTitle: string;
  job_description: string;
  location: string;
};
const Job = (props: JobCard) => {
  const { jobId, jobTitle, job_description, location } = props;
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(`/jobs/${jobId}`)}>
        <div className="job-listing-container">
          <div className="job-title">{jobTitle}</div>
          <div className="job-description">{job_description}</div>
          <div className="job-location">{location}</div>
        </div>
      </button>
    </div>
  );
};

export default Job;
