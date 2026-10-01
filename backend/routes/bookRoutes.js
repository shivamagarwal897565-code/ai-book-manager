const express = require("express");

const {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBook);

router.get("/", authMiddleware, getBooks);

router.get("/:id", authMiddleware, getBook);

router.put("/:id", authMiddleware, updateBook);

router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;