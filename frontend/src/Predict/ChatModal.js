import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './ChatModal.css'; // Ensure this CSS file exists and is styled

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

  useEffect(scrollToBottom, [messages]); // Scroll whenever messages change

  // Memoize fetchHistory to prevent re-creation if props don't change meaningfully
  const fetchHistory = useCallback(async () => {
    if (!imageDetails?.imageId || !userId) {
      // console.warn("Missing imageId or userId for fetching chat history.");
      // Provide an initial message if critical details are missing for API call
      setMessages([{
          role: 'model',
          content: `Cannot load chat. Critical information missing. (Image: ${imageDetails?.imageName || 'Unknown'})`,
          timestamp: new Date().toISOString()
      }]);
      return;
    }

    setIsLoadingHistory(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setMessages([{
            role: 'model',
            content: "Cannot load chat: Missing authentication. Please log in.",
            timestamp: new Date().toISOString()
        }]);
        setIsLoadingHistory(false);
        return;
      }

      const response = await axios.get(
        `${apiUrl}/api/chat/${userId}/${imageDetails.imageId}/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Backend sends imageName and initialPrediction even if messages are empty
      const { messages: fetchedMessages, imageName, initialPrediction } = response.data;

      if (fetchedMessages && fetchedMessages.length > 0) {
        setMessages(fetchedMessages);
      } else {
        // If no history, start with a system message using context from API
        setMessages([{
            role: 'model',
            content: `Let's discuss the image "${imageName || imageDetails.imageName || 'this image'}". The current prediction is "${initialPrediction || imageDetails.prediction || 'Pending'}". What would you like to ask?`,
            timestamp: new Date().toISOString()
        }]);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
      const errorMsg = err.response?.data?.message || "Failed to load chat history.";
      setError(errorMsg);
      setMessages([{
          role: 'model',
          content: `I couldn't load previous messages for "${imageDetails.imageName || 'this image'}". Prediction: "${imageDetails.prediction || 'Pending'}". Error: ${errorMsg}`,
          timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [userId, imageDetails, apiUrl]); // imageDetails is an object, ensure it's stable or use imageDetails.imageId

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]); // Call the memoized fetchHistory

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSendingMessage || !imageDetails?.imageId || !userId) return;

    const userMsgContent = newMessage;
    const userMessage = { 
        role: 'user', 
        content: userMsgContent, 
        timestamp: new Date().toISOString(),
        // sentBy: userId // 'sentBy' is added by backend, not needed from client here for model
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage(''); // Clear input immediately
    setIsSendingMessage(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessages(prev => [...prev, { 
            role: 'model', 
            content: "Cannot send message: Missing authentication. Please log in.",
            timestamp: new Date().toISOString() 
        }]);
        setIsSendingMessage(false);
        return;
      }
      const response = await axios.post(
        `${apiUrl}/api/chat/${userId}/${imageDetails.imageId}/message`,
        { prompt: userMsgContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const modelMessage = { 
          role: 'model', 
          content: response.data.reply, 
          timestamp: new Date().toISOString() 
      };
      setMessages(prev => [...prev, modelMessage]);

    } catch (err) {
      console.error("Error sending message:", err);
      const errorText = err.response?.data?.message || 'Sorry, I encountered an error sending your message. Please try again.';
      setMessages(prev => [...prev, { 
          role: 'model', 
          content: errorText,
          timestamp: new Date().toISOString() 
      }]);
      // Don't setError state here as the error is displayed as a message. Or do, if you want a persistent error banner.
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (!imageDetails) return null; // Should not happen if Patient.js logic is correct

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="chat-modal-header">
          <h3>Chat: {imageDetails.imageName || 'Image'}</h3>
          <button onClick={onClose} className="chat-modal-close-btn" aria-label="Close chat">&times;</button>
        </div>
        
        <div className="chat-modal-image-context">
            {imageDetails.imagePath ? (
                <img 
                    src={`${apiUrl}/${imageDetails.imagePath}`} 
                    alt={imageDetails.imageName || 'Context Image'} 
                    className="chat-context-image"
                    onError={(e) => { e.target.style.display = 'none'; /* Hide broken image */ }}
                />
            ) : <p>No image preview available.</p>}
            <p>Prediction: <strong>{imageDetails.prediction || 'Pending'}</strong></p>
        </div>

        <div className="chat-modal-messages-area">
          {isLoadingHistory && <p className="chat-system-info">Loading history...</p>}
          {!isLoadingHistory && error && messages.length <=1 && <p className="chat-error-indicator">{error}</p>} 
          {/* Show general error only if no messages or only initial system error message */}
          
          {messages.map((msg, index) => (
            <div key={`${msg.role}-${msg.timestamp}-${index}`} className={`chat-message ${msg.role}`}>
              <div className="message-bubble">
                <p>{msg.content}</p>
                <span className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatMessagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-modal-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={isSendingMessage || isLoadingHistory}
            aria-label="Chat message input"
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