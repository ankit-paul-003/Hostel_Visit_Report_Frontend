import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { API_URL } from "./api.js";

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", password: "" });
  const [newAdmin, setNewAdmin] = useState({ name: "", password: "" });
  const [dateRange, setDateRange] = useState("weekly");
  const [isPaul, setIsPaul] = useState(false);

  useEffect(() => {
    fetchForms();
    fetchTeachers();
    fetchAdmins();
    checkIfPaul();
  }, []);

  const checkIfPaul = () => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      setIsPaul(decodedToken.username === "Paul");
    }
  };

  // Fetch Teachers
  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_URL}/teachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        },
      });
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Fetch Forms
  const fetchForms = async () => {
    try {
      const response = await fetch(`${API_URL}/forms`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch forms");
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // Fetch Admins
  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${API_URL}/admins`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch admins");
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Add Teacher
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/add-teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(newTeacher),
      });
      if (!response.ok) throw new Error("Failed to add teacher");
      alert("Teacher added successfully!");
      setNewTeacher({ name: "", password: "" });
      fetchTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  // Add Admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/add-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify(newAdmin),
      });
      if (!response.ok) throw new Error("Failed to add admin");
      alert("Admin added successfully!");
      setNewAdmin({ name: "", password: "" });
      fetchAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  // Delete Teacher
  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await fetch(`${API_URL}/delete-teacher/${teacherId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete teacher");
      setTeachers(prev => prev.filter(t => t.id !== teacherId));
      alert("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await fetch(`${API_URL}/delete-admin/${adminId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete admin");
      setAdmins(prev => prev.filter(a => a.id !== adminId));
      alert("Admin deleted successfully");
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Delete Form
  const handleDeleteForm = async (formId) => {
    try {
      const response = await fetch(`${API_URL}/delete-form/${formId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete form");
      alert("Form deleted successfully!");
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  // Download Reports
  const handleDownload = () => {
    window.open(`${API_URL}/download/${dateRange}`, "_blank");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Submitted Forms */}
      <section className="forms-section">
        <h3>Submitted Forms</h3>
        <table>
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Hostel Name</th>
              <th>Date & Time</th>
              <th>Comments</th>
              <th>Maintenance</th>
              <th>Complaints</th>
              {isPaul && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td data-label="Teacher Name">{form.teacher_name}</td>
                <td data-label="Hostel Name">{form.hostel_name}</td>
                <td data-label="Date & Time">{form.created_at}</td>
                <td data-label="Comments">{form.general_comments}</td>
                <td data-label="Maintenance">{form.maintenance_required}</td>
                <td data-label="Complaints">{form.complaints}</td>
                {isPaul && (
                  <td data-label="Actions">
                    <button onClick={() => handleDeleteForm(form.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Teacher */}
      <section className="add-teacher-section">
        <h3>Add New Teacher</h3>
        <form onSubmit={handleAddTeacher}>
          <input
            type="text"
            placeholder="Teacher Name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newTeacher.password}
            onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
            required
          />
          <button type="submit">Add Teacher</button>
        </form>
      </section>

      {/* Teachers List */}
      <section className="teachers-section">
        <h3>Teachers List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>
                  <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Admin (Only for Admins) */}
      <section className="add-admin-section">
        <h3>Add New Admin</h3>
        <form onSubmit={handleAddAdmin}>
          <input
            type="text"
            placeholder="Admin Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            required
          />
          <button type="submit">Add Admin</button>
        </form>
      </section>

      {/* Admin List */}
      <section className="admins-section">
        <h3>Admins List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>
                  {admin.name !== "Paul" && (
                    <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Download Reports */}
      <section className="download-section">
        <h3>Download Reports</h3>
        <select onChange={(e) => setDateRange(e.target.value)} value={dateRange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button onClick={handleDownload}>Download</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
