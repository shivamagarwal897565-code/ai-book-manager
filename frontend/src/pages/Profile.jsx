import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

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
                    User Profile
                </h2>

                <div
                    className="card"
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    
                    <div style={{ marginBottom: "20px" }}>
                        <span
                            style={{
                                color: "#6b7280",
                                display: "block",
                                fontSize: "13px",
                                marginBottom: "4px"
                            }}
                        >
                            Full Name
                        </span>

                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#111827"
                            }}
                        >
                            {user?.name || "N/A"}
                        </span>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <span
                            style={{
                                color: "#6b7280",
                                display: "block",
                                fontSize: "13px",
                                marginBottom: "4px"
                            }}
                        >
                            Email Address
                        </span>

                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#111827"
                            }}
                        >
                            {user?.email || "N/A"}
                        </span>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            className="primary-button"
                            onClick={() => navigate("/edit-profile")}
                        >
                            Edit Profile
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
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
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;