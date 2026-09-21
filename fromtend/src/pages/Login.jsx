import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/client";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ email, password });
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed!");
        }
    };

    return (
        <div className="auth-card">
            <h2>Log In</h2>
            <form onSubmit={handlesubmit}>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                {error && <p className="error">{error}</p>}
                <button type="submit">Log In</button>
            </form>
            <p>No account? <Link to="/register">Register</Link></p>
        </div>
    );
}