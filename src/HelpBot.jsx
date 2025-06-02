import React, { useState, useEffect, useRef } from 'react';
import './HelpBot.css';
import { v4 as uuidv4 } from 'uuid';

export default function HelpBot({ inactivityThreshold = 30000 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [muted, setMuted] = useState(false);

  const sessionId = useRef(uuidv4());
  const timerRef = useRef(null);

  const helpContentMap = {
    username: 'Your username should be unique and easy to remember.',
    email: 'Use your official email address so we can contact you.',
    password: 'Password should be at least 8 characters long.',
  };

  const resetInactivityTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!muted) {
        setMessages((prev) => [
          ...prev,
          { text: 'Need help with this section?', sender: 'bot' },
        ]);
        setIsOpen(true);
      }
    }, inactivityThreshold);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((e) => window.addEventListener(e, resetInactivityTimer));
    resetInactivityTimer();

    return () => events.forEach((e) => window.removeEventListener(e, resetInactivityTimer));
  }, [muted, inactivityThreshold]);

  const handleSend = () => {
    if (userMessage.trim()) {
      const userMsg = { text: userMessage, sender: 'user' };
      const botReply = {
        text: 'Your enquiry has been sent to admin, you will hear from us soon.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, userMsg, botReply]);
      setUserMessage('');
    }
  };

  const handleReportToAdmin = (errorText) => {
    console.log('Reporting to admin:', {
      sessionId: sessionId.current,
      timestamp: new Date().toISOString(),
      errorText,
    });

    setMessages((prev) => [
      ...prev,
      {
        text: 'Your issue has been reported to an admin. They will review it shortly.',
        sender: 'bot',
      },
    ]);
  };

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
      {
        text: errorMsg,
        sender: 'bot',
        isError: true,
        showReport: true,
      },
    ]);
    setIsOpen(true);
  };

  useEffect(() => {
    window.addEventListener('helpbot-error', handleCustomError);
    return () => window.removeEventListener('helpbot-error', handleCustomError);
  }, []);

  const showContextualHelp = (fieldId) => {
    if (!muted && helpContentMap[fieldId]) {
      setMessages((prev) => [
        ...prev,
        { text: helpContentMap[fieldId], sender: 'bot' },
      ]);
      setIsOpen(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="helpbot-container">
      {isOpen && (
        <div className="helpbot-chatbox">
          <div className="chat-header">
            <span>Clive</span>
            <div>
              <button className="icon-btn" onClick={() => setMuted((m) => !m)}>
                {muted ? '🔕' : '🔔'}
              </button>
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
                  <div
                    key={idx}
                    className={`message ${msg.sender} ${msg.isError ? 'error-message' : ''}`}
                  >
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

      {/* Simulated contextual help triggers (for demo/testing) */}
      <div style={{ display: 'none' }}>
        <input onFocus={() => showContextualHelp('username')} />
        <input onFocus={() => showContextualHelp('email')} />
        <input onFocus={() => showContextualHelp('password')} />
      </div>
    </div>
  );
}
