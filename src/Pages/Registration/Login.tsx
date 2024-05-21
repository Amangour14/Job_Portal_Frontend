import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { useSignIn } from "../../Hooks/useSignIn";

const Login: React.FC = () => {
  const login = useSignIn();
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, action) => {
      login(values);
      action.resetForm();
      setError("");
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit" className="">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
