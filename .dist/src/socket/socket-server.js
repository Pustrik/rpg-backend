"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const socket_listeners_1 = __importDefault(require("./socket-listeners"));
class ServerSocketStart {
    constructor(server) {
        exports.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: process.env.ORIGIN
            }
        });
        console.log('Socket server run');
        exports.io.on('connect', socket_listeners_1.default);
    }
}
exports.default = ServerSocketStart;
//# sourceMappingURL=socket-server.js.map