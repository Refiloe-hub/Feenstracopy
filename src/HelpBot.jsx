import React, { useState, useEffect } from 'react';
import './HelpBot.css';

export default function HelpBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { text: userMessage, sender: 'user' }]);
      setUserMessage('');
    }
  };

  const handleReportToAdmin = (errorText) => {
    console.log('Reporting to admin:', errorText);
    setMessages((prev) => [
      ...prev,
      { text: 'Your issue has been reported to an admin. They will review it shortly.', sender: 'bot' },
    ]);
  };

  useEffect(() => {
    const handleCustomError = (event) => {
      const { type, field, message } = event.detail;
      let errorMsg = '';
      if (type === 'validation') {
        errorMsg = `⚠️ Required field "${field}" is missing. Please fill it in.`;
      } else if (type === 'api') {
        errorMsg = message || '⚠️ An unexpected error occurred.';
      }

      setMessages((prev) => [
        ...prev,
        { text: errorMsg, sender: 'bot', isError: true, showReport: true },
      ]);
      setIsOpen(true);
    };

    window.addEventListener('helpbot-error', handleCustomError);
    return () => window.removeEventListener('helpbot-error', handleCustomError);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="helpbot-container">
      {isOpen && (
        <div className="helpbot-chatbox">
          <div className="chat-header">
            <span>Mike</span>
            <div>
              <button className="icon-btn" onClick={() => setIsOpen(false)}>–</button>
              <button className="icon-btn" onClick={() => setIsVisible(false)}>×</button>
            </div>
          </div>

          <div className="chat-body">
            {messages.length === 0 ? (
              <p className="placeholder">Hi! You seem to be stuck, how can I help you?</p>
            ) : (
              <div className="messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender} ${msg.isError ? 'error-message' : ''}`}>
                    {msg.text}
                    {msg.showReport && (
                      <button
                        className="report-btn"
                        onClick={() => handleReportToAdmin(msg.text)}
                      >
                        Report to Admin
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="helpbot-toggle" onClick={() => setIsOpen(true)}>
          💬 Help
        </button>
      )}
    </div>
  );
}