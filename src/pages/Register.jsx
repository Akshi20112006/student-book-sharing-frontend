import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createStudent } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    phoneNo: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const student = {
        name: form.name,
        email: form.email,
        password: form.password,
        department: form.department,
        semester: form.semester ? Number(form.semester) : null,
        phoneNo: form.phoneNo,
        address: form.address
      };

      await createStudent(student);

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">

        <div className="auth-brand">
          <span className="brand-mark">B</span>
          <span>BookShare</span>
        </div>

        <div className="auth-content">
          <span className="eyebrow">Join the community</span>

          <h1>Create your account</h1>

          <p>
            Start discovering and sharing books with students.
          </p>

          <form className="form" onSubmit={handleSubmit}>

            <div className="two-column">

              <label>
                First Name
                <input
                  type="text"
                  name="name"
                  placeholder="Akshitha"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Last Name
                <input
                  type="text"
                  placeholder="D B"
                />
              </label>

            </div>

            <label>
              College Email
              <input
                type="email"
                name="email"
                placeholder="you@college.edu"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Student ID
              <input
                type="text"
                placeholder="Enter student ID"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <button
              className="btn btn-primary btn-full"
              type="submit"
            >
              Create Account
            </button>

            {message && (
              <p>{message}</p>
            )}

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>

      <div className="auth-visual">
        <div className="auth-quote">
          <span>✦</span>

          <h2>
            Your old textbooks could be exactly what another student needs.
          </h2>

          <p>Share. Discover. Connect.</p>
        </div>
      </div>

    </div>
  );
}

export default Register;