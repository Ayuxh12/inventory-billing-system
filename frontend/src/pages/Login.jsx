import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <input className="form-control mb-2" placeholder="Email"
        onChange={e=>setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password"
        placeholder="Password"
        onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}
