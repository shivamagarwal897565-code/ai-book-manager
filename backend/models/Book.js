const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        genre: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["want-to-read", "reading", "completed"],
            default: "want-to-read"
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Book", bookSchema);