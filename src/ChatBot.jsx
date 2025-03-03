import { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

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
            <h2 style={styles.header}>Chatbot</h2>
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
                    style={styles.input}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} style={styles.sendButton}>
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
        width: "350px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
    header: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    messagesContainer: {
        height: "300px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#fff",
        marginBottom: "15px",
    },
    messageBubble: {
        maxWidth: "70%",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        wordWrap: "break-word",
        fontSize: "14px",
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
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    sendButton: {
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
    },
};