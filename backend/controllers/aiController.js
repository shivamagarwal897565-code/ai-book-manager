const Groq = require("../config/groq");

const User = require("../models/User");
const Book = require("../models/Book");

const chatWithAssistant = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const user = await User.findById(req.user)
            .select("name email createdAt");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const books = await Book.find({
            user: req.user
        }).select(
            "title author description genre status rating createdAt"
        );

        const totalBooks = books.length;

        const completedBooks = books.filter(
            (book) => book.status === "completed"
        ).length;

        const readingBooks = books.filter(
            (book) => book.status === "reading"
        ).length;

        const wantToReadBooks = books.filter(
            (book) => book.status === "want-to-read"
        ).length;

        const ratedBooks = books.filter(
            (book) => book.rating > 0
        );

        const averageRating =
            ratedBooks.length > 0
                ? (
                    ratedBooks.reduce(
                        (sum, book) => sum + book.rating,
                        0
                    ) / ratedBooks.length
                ).toFixed(1)
                : 0;

        const accountData = {
            name: user.name,
            email: user.email,
            accountCreatedAt: user.createdAt
        };

        const bookData = books.map((book) => ({
            title: book.title,
            author: book.author,
            description: book.description,
            genre: book.genre,
            status: book.status,
            rating: book.rating
        }));

        const libraryStats = {
            totalBooks,
            completedBooks,
            readingBooks,
            wantToReadBooks,
            averageRating
        };

        const systemPrompt = `
You are the personal AI assistant for an AI Book Manager application.

You are helping the currently authenticated user.

You can answer questions about:
- Their account
- Their books
- Their reading status
- Their ratings
- Their genres
- Their library statistics
- Their reading patterns
- Recommendations based on their library

IMPORTANT RULES:

1. Only use the account and book information provided below.
2. Never invent books, account information, ratings, or statistics.
3. Never reveal the user's password or any secret information.
4. If information is not available, clearly say that it is not available.
5. If the user asks something unrelated to their account or books, you may answer normally when appropriate.
6. When discussing the user's library, be concise and useful.
7. You may make recommendations based on their library, but clearly identify them as recommendations.
8. Do not claim that you performed an action unless the application actually performed it.
9. The user is the owner of the account data below.

ACCOUNT:
${JSON.stringify(accountData, null, 2)}

LIBRARY STATISTICS:
${JSON.stringify(libraryStats, null, 2)}

BOOKS:
${JSON.stringify(bookData, null, 2)}
`;

        const completion = await Groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.3,
            max_completion_tokens: 1000
        });

        let answer = completion.choices[0].message.content;
        answer = answer.replace(/\*\*/g, "");

        res.status(200).json({
            answer
        });
    } catch (error) {
        console.error("AI assistant error:", error);

        res.status(500).json({
            message: "AI assistant failed"
        });
    }
};

module.exports = {
    chatWithAssistant
};