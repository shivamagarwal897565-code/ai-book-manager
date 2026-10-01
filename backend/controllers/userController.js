const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Get profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            const existingUser = await User.findOne({
                email,
                _id: { $ne: req.user }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already in use"
                });
            }

            user.email = email;
        }

        if (password !== undefined) {
            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters"
                });
            }

            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};