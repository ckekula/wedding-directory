import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Replace with your backend URL

export const sendMessage = (message: string) => {
    socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback: (message: string) => void) => {
    socket.on('receiveMessage', callback);
};