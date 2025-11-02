import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api.js";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    teacherName: "",
    subordinateTeacherName: "",
    hostelName: "",
    generalComments: "",
    maintenanceRequired: "",
    complaints: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired! Please log in again.");
      navigate("/teacher-login");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${API_URL}/submit-form`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert("Form submitted successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2 className="form-title">HOSTEL REPORT SUBMISSION</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Date & Time</label>
            <input type="text" name="dateTime" value={formData.dateTime} className="form-control" readOnly />
          </div>
          <div className="form-group">
            <label>Teacher Name</label>
            <input type="text" name="teacherName" value={formData.teacherName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Subordinate Teacher Name</label>
            <input type="text" name="subordinateTeacherName" value={formData.subordinateTeacherName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Hostel Name</label>
            <input type="text" name="hostelName" value={formData.hostelName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>General Comments</label>
            <textarea name="generalComments" value={formData.generalComments} onChange={handleChange} className="form-control" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Maintenance Required</label>
            <textarea name="maintenanceRequired" value={formData.maintenanceRequired} onChange={handleChange} className="form-control" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Complaints</label>
            <textarea name="complaints" value={formData.complaints} onChange={handleChange} className="form-control" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Upload Image (Optional)</label>
            <input type="file" name="image" onChange={handleFileChange} className="form-control" />
          </div>
          <button type="submit" className="form-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
