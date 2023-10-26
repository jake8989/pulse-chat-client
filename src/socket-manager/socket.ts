import { io, Socket } from 'socket.io-client';
let url = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000';
console.log(url);
let socket: Socket;

socket = io(url, { transports: ['websocket'] });
export default socket;
