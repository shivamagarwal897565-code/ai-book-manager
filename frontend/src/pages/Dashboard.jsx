import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import AIAssistant from "../components/AIAssistant";

const Dashboard = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/books");

            setBooks(response.data.books);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load books"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/books/${id}`);

            setBooks((previousBooks) =>
                previousBooks.filter(
                    (book) => book._id !== id
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete book"
            );
        }
    };

    return (
        <div className="dashboard">

            <Navbar />

            <div className="dashboard-layout">

                <main className="books-section">

                    <div className="dashboard-header">

                        <div>
                            <h1>My Library</h1>

                            <p>
                                Manage your personal
                                book collection
                            </p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate("/books/add")
                            }
                        >
                            + Add Book
                        </button>

                    </div>

                    {loading && (
                        <p>Loading books...</p>
                    )}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        books.length === 0 && (
                            <div className="empty-state">
                                <h2>
                                    Your library is empty
                                </h2>

                                <p>
                                    Add your first book
                                    to get started.
                                </p>

                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        navigate(
                                            "/books/add"
                                        )
                                    }
                                >
                                    Add Your First Book
                                </button>
                            </div>
                        )}

                    <div className="books-grid">

                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                onDelete={handleDelete}
                            />
                        ))}

                    </div>

                </main>

                <AIAssistant />

            </div>

        </div>
    );
};

export default Dashboard;