import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:5000'); // Connect to the backend

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = prompt("Please enter your name:");
    if (name) {
      setUserName(name);
    }

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
        sender: userName, // Use userName instead of a static value
        status: 'sent',
      };
      socket.emit('message', newMessage);  // Send message to server
      setMessage('');  // Clear input field
    }
  };

  return (
    <div className="chat-container">
      <h2>Live Chat Support</h2>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender === userName ? 'user-message' : 'support-message'}`}>
            <div className="sender-name">{chat.sender}:</div> {/* Display sender name */}
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
