import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { loginUser } from "../../Services/FormSubmission";
import { useQueryClient, useMutation } from "react-query";
import { useAuth } from "../../Services/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const user = useAuth();

  const [error, setError] = useState<string>("");
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", data.data);
      nav("/");
      queryClient.invalidateQueries("data");
      toast.success(`Login Succefully`, {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error(`Invalid Credantial`, {
        position: "top-center",
      });
    },
  });

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
      mutate(values);
      action.resetForm();
      setError("");
    },
  });

  useEffect(() => {
    if (user.user) nav("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
