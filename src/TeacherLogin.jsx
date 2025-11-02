import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api.js";
import "./TeacherLogin.css";

const TeacherLogin = () => {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`${API_URL}/teacher-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId, password }),
    });
  
    const data = await response.json();
  
    if (data.success) {
      localStorage.setItem("token", data.token); // Store token
      alert("Login successful!");
      navigate("/submit-form");
    } else {
      alert("Login failed: " + data.message);
    }
  };
  
  
  //     console.log(data); // Handle response (e.g., redirect on success)
  //   } catch (error) {
  //     console.error("Login failed:", error.message);
  //   }
  // };

  



  return (
    <div className="container">
      <h2>Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="teacher-id">Teacher ID</label>
          <input
            type="text"
            id="teacher-id"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default TeacherLogin;
