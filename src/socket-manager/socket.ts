import { io, Socket } from 'socket.io-client';
let url = process.env.NEXT_PUBLIC_BACKEND;
const socket: Socket = io(url, { transports: ['websocket'] });
export default socket;
