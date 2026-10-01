const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    register,
    login,
    logout
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;