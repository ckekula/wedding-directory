'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!, $conversationId: String) {
    sendMessage(message: $message, conversationId: $conversationId) {
      response
      conversationId
    }
  }
`;

interface Message {
  content: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: 'Hi there! I can help you find information about wedding vendors, services, and packages. How can I assist you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { content: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      // Send to backend and get response
      const { data } = await sendMessage({
        variables: {
          message: input,
          conversationId,
        },
      });

      // Add bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: data.sendMessage.response, isUser: false },
      ]);

      // Store conversation ID
      if (!conversationId) {
        setConversationId(data.sendMessage.conversationId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'Sorry, I encountered an error. Please try again later.', isUser: false },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange hover:bg-primary text-white rounded-full p-4 shadow-lg"
      >
        {isOpen ? (
          <p>Close</p>
        ) : (
          <p>Ask AI</p>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[448px] h-[512px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="bg-orange text-white p-4">
            <h3 className="font-medium">Wedding Planner Assistant</h3>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.isUser ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-orange text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about vendors, services, or packages..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-orange hover:bg-primary text-white p-2 rounded-r-lg"
                disabled={loading}
              >
                {loading ? (
                  <p>loading...</p>
                ) : (
                  null
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;