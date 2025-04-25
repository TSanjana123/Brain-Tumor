import React from "react";
import "./ChatModal.css";

const ChatModal = ({ onClose }) => {
  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-modal-header">
          <h2>Let’s Chat!</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="chat-modal-body">
          <p>Hello! I'm your virtual assistant. How can I help you today?</p>
          <input type="text" placeholder="Type your message..." className="chat-input" />
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
