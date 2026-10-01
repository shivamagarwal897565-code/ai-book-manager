import { useState } from "react";
import api from "../services/api";

const AIAssistant = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message.trim();

        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                content: userMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/ai/chat", {
                message: userMessage,
            });

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: response.data.answer,
                },
            ]);
        } catch (error) {
            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content:
                        "Sorry, I couldn't process your request.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="ai-sidebar">

            <div className="ai-header">
                <div>
                    <h2>AI Assistant</h2>

                    <span>
                        Your personal reading assistant
                    </span>
                </div>
            </div>

            <div className="chat-messages">

                {messages.length === 0 && (
                    <div className="ai-welcome">

                        <h3>
                            Hi! 👋
                        </h3>

                        <p>
                            Ask me about your books,
                            reading progress or library.
                        </p>

                    </div>
                )}

                {messages.map((item, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            item.role
                        }`}
                    >
                        {item.content}
                    </div>
                ))}

                {loading && (
                    <div className="chat-message assistant">
                        Thinking...
                    </div>
                )}

            </div>

            <form
                className="chat-input"
                onSubmit={sendMessage}
            >

                <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Ask about your library..."
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    Send
                </button>

            </form>

        </aside>
    );
};

export default AIAssistant;