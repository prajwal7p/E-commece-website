import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/register", form);

      alert(res.data.status);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.status || "Signup Failed");
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="brand"> ShopKart</h1>
        <h2>Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Create Account</button>
      </form>
    </div>
  );
}

export default Signup;