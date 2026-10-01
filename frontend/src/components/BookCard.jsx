import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="book-card">

            <div className="book-card-content">

                <h3>{book.title}</h3>

                <p className="book-author">
                    by {book.author}
                </p>

                {book.genre && (
                    <span className="book-genre">
                        {book.genre}
                    </span>
                )}

                {book.description && (
                    <p className="book-description">
                        {book.description}
                    </p>
                )}

                <div className="book-info">

                    <span>
                        Status:
                        <strong>
                            {" "}{book.status}
                        </strong>
                    </span>

                    <span>
                        Rating:
                        <strong>
                            {" "}{book.rating}/5
                        </strong>
                    </span>

                </div>

            </div>

            <div className="book-actions">

                <button
                    className="edit-button"
                    onClick={() =>
                        navigate(
                            `/books/edit/${book._id}`
                        )
                    }
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={() =>
                        onDelete(book._id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default BookCard;