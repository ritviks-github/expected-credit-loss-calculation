import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("analyst");

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const mail = localStorage.getItem("email");
        const roles = localStorage.getItem("role");
        if(mail || roles){
            if(roles === "cro"){
                navigate('/dashboard-cro');
            }else if(roles === 'analyst'){
                navigate("/dashboard-analyst");
            }
        }
    })
    const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
        role
      });

      const { token, user } = response.data;

      // Save token to localStorage or session
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem("email",user.email)

      // Redirect based on role
      if (user.role === 'analyst') {
        navigate('/dashboard-analyst');
      } else {
        navigate('/dashboard-cro');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
     <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="analyst">Analyst</option>
              <option value="cro">CRO</option>
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  )
}
