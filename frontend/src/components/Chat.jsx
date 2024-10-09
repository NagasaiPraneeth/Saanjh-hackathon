import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        text: inputMessage,
        sender: userRole,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate a response from the other party
      setTimeout(() => {
        const responseMessage = {
          text: `This is a response from the ${userRole === 'Doctor' ? 'Caretaker' : 'Doctor'}`,
          sender: userRole === 'Doctor' ? 'Caretaker' : 'Doctor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white w-full max-w-lg mx-auto rounded shadow-lg p-4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat with {userRole === 'Doctor' ? 'Caretaker' : 'Doctor'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === userRole ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === userRole ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow p-2 border rounded-l"
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
