import { useFormik } from "formik";
import * as Yup from "yup";
import "./Contact.css";
import { addContact } from "../../Services/FormSubmission";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../Services/useAuth";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(3),
  email: Yup.string().email("Invalid email address").required("Required"),
  message: Yup.string().required("Required"),
});

const ContactForm = () => {
  const queryClient = useQueryClient();
  const user = useAuth();

  const { mutate } = useMutation(addContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("contactuser");
      toast.success(`Message send successfully`, {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error(`Something Wrong!`, {
        position: "top-center",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: ContactFormSchema,
    onSubmit: (values, action) => {
      if (user.user === null) {
        toast.info(`You need to login for submitting Query`, {
          position: "top-center",
        });
      } else {
        mutate(values);
        action.resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="contact-form-container">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" {...formik.getFieldProps("message")} />
        {formik.touched.message && formik.errors.message && (
          <div className="error-message">{formik.errors.message}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
