import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import api from "../services/api";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(
                    `/books/${id}`
                );

                const book = response.data.book;

                setForm({
                    title: book.title,
                    author: book.author,
                    description: book.description || "",
                    genre: book.genre || "",
                    status: book.status,
                    rating: book.rating,
                });
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load book"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await api.put(`/books/${id}`, {
                ...form,
                rating: Number(form.rating),
            });

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update book"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-page">
                Loading book...
            </div>
        );
    }

    if (!form) {
        return (
            <div className="error-page">
                {error}
            </div>
        );
    }

    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Edit Book</h1>

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
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Book"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditBook;