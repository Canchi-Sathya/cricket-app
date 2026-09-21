import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/client";
export default function Register() {
const [form, setForm] = useState({ email: "", password: "", confirm_password: "" });
const [error, setError] = useState("");
const navigate = useNavigate();
const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
e.preventDefault();
try {
await register(form);
navigate("/login");
} catch (err) {
setError(err.response?.data?.detail || "Registration failed");
}
};
return (
<div className="auth-card">
<h2>Create Account</h2>
<form onSubmit={handleSubmit}>
<input name="email" type="email" placeholder="Email" onChange={handleChange} required />
<input name="password" type="password" placeholder="Password" onChange={handleChange} required />
<input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
{error && <p className="error">{error}</p>}
<button type="submit">Create Account</button>
</form>
<p>Have an account? <Link to="/login">Log In</Link></p>
</div>
)};