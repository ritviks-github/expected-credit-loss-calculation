import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const sender = localStorage.getItem("role"); // "Analyst" or "CRO"

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get('https://expected-credit-loss-calculation.onrender.com/api/messages');
    setChat(res.data);
  };

  const sendMessage = async () => {
    if (message.trim()) {
      await axios.post('https://expected-credit-loss-calculation.onrender.com/api/messages', {
        sender,
        message
      });
      setMessage('');
      fetchMessages();
    }
  };

  return (
    <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '12px', width: '100%', maxWidth: 600 }}>
      <h5 style={{ marginBottom: '1rem' }}>Analyst-CRO Chat</h5>
      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: '1rem', padding: '0.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              margin: '8px 0',
              display: 'flex',
              justifyContent: msg.sender === sender ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                background: msg.sender === sender ? '#DCF8C6' : '#E5E5EA',
                color: '#000',
                padding: '8px 12px',
                borderRadius: '16px',
                maxWidth: '70%',
                textAlign: 'left'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '4px' }}>
                {msg.sender}
              </div>
              <div style={{ fontSize: '0.85rem' }}>{msg.message}</div>
              <div style={{ fontSize: '0.7rem', textAlign: 'right', marginTop: 4 }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="btn btn-dark" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
