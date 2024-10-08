import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader, MessageCircle, X } from 'lucide-react';
import axios from 'axios';

const MedicalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/en/chatbot`,{input:input } );

    let botResponse;
      botResponse = {
        text: data.data.data,
        sender: 'bot'
      };

    setMessages(prev => [...prev, botResponse]);
    setIsLoading(false);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 flex flex-col h-[500px] w-[350px] border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="bg-[#e8edf3] text-black p-4 font-bold flex justify-between items-center">
            <span>Medical Chatbot</span>
            <button onClick={toggleChatbot} className="text-black hover:text-gray-950 focus:outline-none">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-300 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your medical query..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" /> : <Send />}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </>
  );
};

export default MedicalChatbot;