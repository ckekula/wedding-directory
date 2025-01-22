"use client";
import React, { useEffect, useState } from 'react';
import { sendMessage, onMessageReceived } from '../lib/websocket';

const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        onMessageReceived((newMessage: string) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
    }, []);

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 border-b">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow p-2 border rounded-l"
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white rounded-r"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;