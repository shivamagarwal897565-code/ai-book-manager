import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";

const EditProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const updateData = {
                name,
                email
            };

            if (password.trim()) {
                updateData.password = password;
            }

            const response = await api.put(
                "/users/profile",
            updateData
            );

            const updatedUser = response.data.user;

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setMessage(
                response.data.message ||
                "Profile updated successfully!"
            );

            setPassword("");

            setTimeout(() => {
                navigate("/profile");
                window.location.reload();
            }, 800);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Navbar />

            <div
                className="container mt-4"
                style={{
                    maxWidth: "600px",
                    margin: "40px auto",
                    padding: "0 20px 60px 20px"
                }}
            >
                <h2
                    style={{
                        marginBottom: "20px",
                        color: "#111827"
                    }}
                >
                    Edit Profile
                </h2>

                {message && (
                    <p
                        style={{
                            color: "green",
                            marginBottom: "15px"
                        }}
                    >
                        {message}
                    </p>
                )}

                {error && (
                    <p
                        style={{
                            color: "red",
                            marginBottom: "15px"
                        }}
                    >
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleUpdate}
                    className="card"
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    {/* Name */}
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "6px"
                            }}
                        >
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #d1d5db",
                                fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "6px"
                            }}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #d1d5db",
                                fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "6px"
                            }}
                        >
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Leave blank to keep current password"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #d1d5db",
                                fontSize: "14px"
                            }}
                        />

                        <small
                            style={{
                                color: "#6b7280",
                                display: "block",
                                marginTop: "6px"
                            }}
                        >
                            Password must be at least 6 characters.
                        </small>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            style={{
                                background: "#f3f4f6",
                                color: "#374151",
                                border: "1px solid #d1d5db",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;