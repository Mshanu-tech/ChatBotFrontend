import { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const sendMessage = async () => {
        if (!input) return;
        const userMessage = { role: "user", message: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await axios.post("http://localhost:5000/chat", { message: input });
        console.log("response", response.data);

        const botMessage = { role: "bot", message: response.data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setInput("");
    };

    return (
        <div style={styles.chatbotContainer}>
            <h2 style={styles.header}>New Chat_Bot</h2>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.messageBubble,
                            ...(msg.role === "user" ? styles.userMessage : styles.botMessage),
                        }}
                    >
                        {msg.message}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        ...styles.input,
                        borderColor: isInputFocused ? "#007bff" : "#e0e0e0",
                    }}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        ...styles.sendButton,
                        backgroundColor: isButtonHovered ? "#0056b3" : "#007bff",
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbot;

// Styles
const styles = {
    chatbotContainer: {
        width: "400px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
        fontWeight: "600",
    },
    messagesContainer: {
        height: "400px",
        overflowY: "scroll",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "#fafafa",
        marginBottom: "15px",
    },
    messageBubble: {
        maxWidth: "80%",
        padding: "12px",
        borderRadius: "12px",
        marginBottom: "10px",
        wordWrap: "break-word",
        fontSize: "14px",
        lineHeight: "1.5",
    },
    userMessage: {
        backgroundColor: "#007bff",
        color: "#fff",
        marginLeft: "auto",
        textAlign: "right",
    },
    botMessage: {
        backgroundColor: "#e9ecef",
        color: "#333",
        marginRight: "auto",
        textAlign: "left",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    sendButton: {
        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
    },
};