import React from "react";
import { FieldProps, ErrorMessage } from "formik";

const FileInput: React.FC<FieldProps> = ({ field, form }) => {
  const [fileName, setFileName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    form.setFieldValue(field.name, file);
    setFileName(file ? file.name : "");
  };

  return (
    <div>
      <input
        type="file"
        id="resume"
        name="resume"
        onChange={handleChange}
        accept="application/pdf"
      />
      {fileName && <div>Selected file: {fileName}</div>}
      <ErrorMessage name="resume" component="div" className="error-message" />
    </div>
  );
};

export default FileInput;
