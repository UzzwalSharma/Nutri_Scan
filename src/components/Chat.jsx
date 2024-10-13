import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import './Chat.css';

const socket = io('http://localhost:5000'); // Connect to the backend

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState(''); // State to store username
  const [hasEnteredName, setHasEnteredName] = useState(false); // Check if user entered name
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Control emoji picker visibility

  useEffect(() => {
    // Listen for messages from the server
    const handleNewMessage = (newMessage) => {
      setChatHistory((prev) => [...prev, newMessage]);
    };

    socket.on('message', handleNewMessage);

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off('message', handleNewMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: username, // Use the username in the message
        sender: 'User',
        status: 'sent',
      };
      socket.emit('message', newMessage); // Send message to server
      setMessage(''); // Clear input field
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native); // Add selected emoji to the message
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setHasEnteredName(true); // Allow chat once name is set
    }
  };

  // If the user hasn't entered a name yet, show the name input
  if (!hasEnteredName) {
    return (
      <div className="chat-container">
        <h2>Enter your name to start the chat</h2>
        <div className="username-input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
          />
          <button onClick={handleUsernameSubmit}>Submit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h2>NutriScan Adda</h2>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender === 'User' ? 'user-message' : 'support-message'}`}>
            <div className="sender-name">{chat.name}:</div> {/* Display sender's name */}
            <div className="message-content">
              <div className="message-text">{chat.content}</div>
              <div className="message-info">
                <span className="message-time">{chat.time}</span>
                <span className="message-status">✔✔</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="emoji-button"
        >
          😊
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onSelect={handleEmojiSelect} />
          </div>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
