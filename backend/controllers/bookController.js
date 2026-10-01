const Book = require("../models/Book");

const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            description,
            genre,
            status,
            rating
        } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                message: "Title and author are required"
            });
        }

        const book = await Book.create({
            title,
            author,
            description,
            genre,
            status,
            rating,
            user: req.user
        });

        res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        console.error("Create book error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({
            user: req.user
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            books
        });
    } catch (error) {
        console.error("Get books error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            book
        });
    } catch (error) {
        console.error("Get book error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const {
            title,
            author,
            description,
            genre,
            status,
            rating
        } = req.body;

        if (title !== undefined) {
            book.title = title;
        }

        if (author !== undefined) {
            book.author = author;
        }

        if (description !== undefined) {
            book.description = description;
        }

        if (genre !== undefined) {
            book.genre = genre;
        }

        if (status !== undefined) {
            book.status = status;
        }

        if (rating !== undefined) {
            book.rating = rating;
        }

        await book.save();

        res.status(200).json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        console.error("Update book error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        await book.deleteOne();

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error("Delete book error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
};