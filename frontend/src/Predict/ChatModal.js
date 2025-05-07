// ChatModal.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatModal.css'; // We'll create this CSS file

const ChatModal = ({ userId, imageDetails, onClose, apiUrl }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [error, setError] = useState('');
  const chatMessagesEndRef = useRef(null);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!imageDetails || !imageDetails.imageId || !userId) return;
      setIsLoadingHistory(true);
      setError('');
      try {
        const token = localStorage.getItem('token'); // Get token for authenticated request
        const response = await axios.get(
          `${apiUrl}/api/chat/${userId}/${imageDetails.imageId}/history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data && response.data.messages) {
          if (response.data.messages.length === 0) {
            // If no history, start with a system message about the image
            setMessages([{
                role: 'model',
                content: `Let's discuss the image "${imageDetails.imageName || 'this image'}". The current prediction is "${imageDetails.prediction || 'Pending'}". What would you like to ask?`,
                timestamp: new Date().toISOString()
            }]);
          } else {
             setMessages(response.data.messages);
          }
        } else {
            // Fallback if API structure is different or empty
             setMessages([{
                role: 'model',
                content: `Starting a new chat about "${imageDetails.imageName || 'this image'}". Prediction: "${imageDetails.prediction || 'Pending'}". Ask me anything.`,
                timestamp: new Date().toISOString()
            }]);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setError('Failed to load chat history.');
        // Initialize with a guiding message even on error
        setMessages([{
            role: 'model',
            content: `I couldn't load previous messages for "${imageDetails.imageName || 'this image'}". How can I help you with it? Prediction: "${imageDetails.prediction || 'Pending'}"`,
            timestamp: new Date().toISOString()
        }]);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [userId, imageDetails, apiUrl]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSendingMessage) return;

    const userMsgContent = newMessage;
    setNewMessage(''); // Clear input immediately

    const userMessage = { 
        role: 'user', 
        content: userMsgContent, 
        timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, userMessage]);
    setIsSendingMessage(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/api/chat/${userId}/${imageDetails.imageId}/message`,
        { prompt: userMsgContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // response.data.reply contains the AI's message
      const modelMessage = { 
          role: 'model', 
          content: response.data.reply, 
          timestamp: new Date().toISOString() 
      };
      setMessages(prev => [...prev, modelMessage]);

    } catch (err) {
      console.error("Error sending message:", err);
      const errorText = err.response?.data?.message || 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, { 
          role: 'model', 
          content: errorText,
          timestamp: new Date().toISOString() 
      }]);
      setError('Failed to send message.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (!imageDetails) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-container">
        <div className="chat-modal-header">
          <h3>Chat about: {imageDetails.imageName || 'Image'}</h3>
          <button onClick={onClose} className="chat-modal-close-btn">&times;</button>
        </div>
        
        <div className="chat-modal-image-context">
            <img 
                src={`${apiUrl}/${imageDetails.imagePath}`} 
                alt={imageDetails.imageName || 'Context Image'} 
                className="chat-context-image"
            />
            <p>Current Prediction: <strong>{imageDetails.prediction || 'Pending'}</strong></p>
        </div>

        <div className="chat-modal-messages-area">
          {isLoadingHistory && <p>Loading history...</p>}
          {error && <p className="chat-error-indicator">{error}</p>}
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <div className="message-bubble">
                <p>{msg.content}</p>
                <span className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatMessagesEndRef} /> {/* For auto-scrolling */}
        </div>

        <form onSubmit={handleSendMessage} className="chat-modal-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isSendingMessage || isLoadingHistory}
          />
          <button type="submit" disabled={isSendingMessage || isLoadingHistory || !newMessage.trim()}>
            {isSendingMessage ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;


