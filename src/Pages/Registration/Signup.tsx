import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import { useSignUp } from "../../Hooks/useRegister";

const Signup: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const signUp = useSignUp();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required").min(6),
    }),
    onSubmit: (values, action) => {
      signUp(values);
      action.resetForm();
      setError("");
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <center>
          <h2>Signup</h2>
        </center>
        <div>
          Email:
          <input type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div>
          Password:
          <input type="password" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
          {error && <div>{error}</div>}
        </div>
        <button className=".signup" type="submit">
          Signup
        </button>
        <div>
          <p>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Login</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
