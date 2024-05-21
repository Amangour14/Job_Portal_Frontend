import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./UD_Job_form.css";
import { useMutation, useQueryClient } from "react-query";
import { apply } from "../../Services/FormSubmission";
import { toast } from "react-toastify";
import { Card } from "../../utils/Types";
import useJobStore from "../../Stores/JobApply";

export interface FormValues {
  fullName: string;
  email: string;
  resume: File | null;
  experience: string;
}
type Apply = {
  JobJobId: Card | null;
  jobApplication: FormValues;
};

const UD_Job_Form: React.FC = () => {
  const initialValues: FormValues = {
    fullName: "",
    email: "",
    resume: null,
    experience: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    resume: Yup.mixed().required("Resume is required"),
    experience: Yup.string().required("Experience is required"),
  });

  const queryClient = useQueryClient();
  const jobStore = useJobStore();

  const { mutate } = useMutation(apply, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success(`Your application Submitted Successfully`, {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error(`You Already applied for this job`, {
        position: "top-center",
      });
    },
  });

  const handleSubmit = (values: FormValues) => {
    const job: Card | null = jobStore.job;
    const applyData: Apply = { JobJobId: job, jobApplication: values };
    mutate(applyData);
  };

  return (
    <div className="job-form-container">
      <h2>Job Application Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="job-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <Field type="text" id="fullName" name="fullName" />
              <ErrorMessage
                name="fullName"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume:</label>
              <Field type="file" id="resume" name="resume" />
              <ErrorMessage
                name="resume"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience:</label>
              <Field as="textarea" id="experience" name="experience" />
              <ErrorMessage
                name="experience"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              className="ud-button"
              disabled={isSubmitting || !isValid}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UD_Job_Form;
