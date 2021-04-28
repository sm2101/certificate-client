import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
const InputForm = () => {
  const [name, setName] = useState(""),
    [role, setRole] = useState(""),
    [course, setCourse] = useState("");
  const server = "https://certificate-server-2101.herokuapp.com";
  const createAndDownloadPdf = () => {
    axios
      .post(`${server}/create-pdf`, {
        name,
        role,
        course,
      })
      .then(() =>
        axios
          .get(`${server}/fetch-pdf`, { responseType: "blob" })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, "certificate.pdf");
          })
      );
  };
  return (
    <>
      <h2 className="mb-4 display-4">Certificate Creator</h2>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          id="name"
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
          id="role"
        />
        <label htmlFor="role">Role</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Course Name"
          name="course"
          val={course}
          onChange={(e) => setCourse(e.target.value)}
          className="form-control"
          id="course"
        />
        <label htmlFor="course">Course</label>
      </div>
      <button
        onClick={createAndDownloadPdf}
        className="form-control btn btn-outline-primary"
      >
        Download PDF
      </button>
    </>
  );
};

export default InputForm;
