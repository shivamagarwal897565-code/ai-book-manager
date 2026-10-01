import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/login"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route element={<ProtectedRoute />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/books/add"
                            element={<AddBook />}
                        />

                        <Route
                            path="/books/edit/:id"
                            element={<EditBook />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />


                        <Route
                            path="/edit-profile"
                            element={<EditProfile />}
                        />
                        
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;