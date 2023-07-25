import {Server as HttpServer} from 'http';
import {Server} from 'socket.io';
import startListeners from "./socket-listeners";

export let io: Server;

class ServerSocketStart {
    constructor(server: HttpServer) {
        io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: process.env.ORIGIN
            }
        });
        console.log('Socket server run')
        io.on('connect', startListeners);
    }
}

export default ServerSocketStart;