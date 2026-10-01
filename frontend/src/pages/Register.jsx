import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        loading,
    } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const result = await register(
            name,
            email,
            password
        );

        if (result.success) {
            navigate("/login");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Start managing your library
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="At least 6 characters"
                            required
                        />
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="auth-footer">
                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Register;