import "./JobDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import useJobQuery from "../../Services/useJobQuery";
import useJobStore from "../../Stores/JobApply";
import { toast } from "react-toastify";
import { Card } from "../../utils/Types";

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id as string);
  const { data, isLoading, isError, error } = useJobQuery(jobId);
  const jobstore = useJobStore();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const apply = (data: Card) => {
    if (user) {
      jobstore.applyOne(data);
      navigate("/jobform");
    } else {
      toast.info(`You have to login first for applying for job`, {
        position: "top-center",
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="job-details-container">
      <h2>{data.jobTitle}</h2>
      <p>
        <b>Location:</b> {data.location}
      </p>
      <p>
        <b>Salary:</b>
        {data.salary}
      </p>
      <p>
        <b>Experience:</b>
        {data.experiences}
      </p>
      <p>
        <b>Description:</b>
        {data.job_description}
      </p>
      <p>
        <b>Responsibility:</b>
        {data.job_responsibility}
      </p>
      <p>
        <b>Education:</b>
        {data.educational_requirement}
      </p>
      <p>
        <b>{data.remote_or_onsite}</b>
      </p>
      <button onClick={() => apply(data)}>Apply Now</button>
    </div>
  );
};

export default JobDetails;
