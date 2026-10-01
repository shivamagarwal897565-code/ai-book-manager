import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
                BookAI
            </div>

            <div className="navbar-right">
                <button
                    className="profile-button"
                    onClick={() => navigate("/profile")}
                    style={{ marginRight: "10px" }}
                >
                    Profile
                </button>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;