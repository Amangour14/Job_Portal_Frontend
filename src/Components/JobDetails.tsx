import React, { useEffect, useState } from "react";
import "./JobDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import useJobQuery from "../Hooks/useJobQuery";
import useJobStore from "../Stores/JobApply";
import { Card } from "../Pages/Job/Job";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-toastify";

const JobDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id as string);
  const { data, isLoading, isError, error } = useJobQuery(jobId);
  const jobstore = useJobStore();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkUser = (user:any) => {
    return !!user;
  };

  const [ifUser, setIfUser] = useState<boolean>();
  const apply = (data: Card) => {
    if (ifUser) {
      jobstore.applyOne(data);
      navigate("/jobform");
    } else {
      toast.info(`You have to login first for applying for job`, {
        position: "top-center",
      });
    }
  };
  const user = useAuth();
  useEffect(() => {
    const isuser = checkUser(user.user);
    console.log(isuser);
    setIfUser(isuser);
    return () => {};
  }, []);

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
