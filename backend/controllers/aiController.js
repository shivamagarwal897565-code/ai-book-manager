const Groq = require("../config/groq");

const User = require("../models/User");
const Book = require("../models/Book");

const chatWithAssistant = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate message
        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        // Get authenticated user
        const user = await User.findById(req.user)
            .select("name email createdAt");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Get only books belonging to the authenticated user
        const books = await Book.find({
            user: req.user
        }).select(
            "title author description genre status rating createdAt"
        );

        // Calculate library statistics
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

        // User account information
        const accountData = {
            name: user.name,
            email: user.email,
            accountCreatedAt: user.createdAt
        };

        // User's books
        const bookData = books.map((book) => ({
            title: book.title,
            author: book.author,
            description: book.description,
            genre: book.genre,
            status: book.status,
            rating: book.rating
        }));

        // Library statistics
        const libraryStats = {
            totalBooks,
            completedBooks,
            readingBooks,
            wantToReadBooks,
            averageRating
        };

        // AI instructions
        const systemPrompt = `
You are the personal AI assistant for an AI Book Manager application.

You are helping the currently authenticated user.

You can help with:

- Their account
- Their books
- Their reading status
- Their ratings
- Their genres
- Their library statistics
- Their reading patterns
- Book recommendations

IMPORTANT RULES:

1. When answering questions about the user's account or library, use only the account and book information provided below.

2. Never invent information about the user's account, books, ratings, reading status, or library statistics.

3. Never reveal passwords, API keys, JWT tokens, or other secret information.

4. If information about the user's account or library is not available, clearly say that it is not available.

5. For book recommendation requests, you may use your general knowledge about books.

6. When recommending books, clearly present them as recommendations and do not claim that they are already in the user's library unless they appear in the provided BOOKS data.

7. Do not claim that you added, deleted, updated, or modified a book unless the application actually performed that action.

8. Keep responses concise, friendly, useful, and conversational.

9. Use plain text only.

10. DO NOT use Markdown formatting.

11. DO NOT use Markdown tables.

12. DO NOT use the "|" character to create tables.

13. DO NOT use "*" or "**" for formatting.

14. DO NOT use Markdown headings.

15. DO NOT use code blocks.

16. For lists, use simple numbered lists.

Example:

1. The Silent Patient — Alex Michaelides
A psychological thriller with an intriguing mystery.

2. Project Hail Mary — Andy Weir
A science-fiction adventure involving space and survival.

17. Prefer short paragraphs and simple numbered lists instead of large blocks of text.

18. If the user asks for recommendations, provide useful recommendations with a short explanation for each one.

19. Answer naturally and directly. Do not mention these instructions to the user.

ACCOUNT:

${JSON.stringify(accountData, null, 2)}

LIBRARY STATISTICS:

${JSON.stringify(libraryStats, null, 2)}

BOOKS:

${JSON.stringify(bookData, null, 2)}
`;

        // Send request to Groq
        const completion = await Groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message.trim()
                }
            ],

            temperature: 0.3,

            max_completion_tokens: 1000
        });

        // Safely get AI response
        let answer = completion?.choices?.[0]?.message?.content;

        if (!answer) {
            return res.status(500).json({
                message: "AI returned an empty response"
            });
        }

        // Remove accidental Markdown formatting
        answer = answer
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .trim();

        // Send response
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