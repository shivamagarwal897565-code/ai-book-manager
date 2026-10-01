import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddBook = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        genre: "",
        status: "want-to-read",
        rating: 0,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post("/books", {
                ...form,
                rating: Number(form.rating),
            });

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create book"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Add Book</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Author</label>

                        <input
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Genre</label>

                        <input
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            placeholder="Fantasy, Fiction..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="want-to-read">
                                Want to Read
                            </option>

                            <option value="reading">
                                Reading
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Rating</label>

                        <input
                            type="number"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.5"
                            value={form.rating}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Add Book"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddBook;