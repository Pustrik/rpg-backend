"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_server_1 = require("../socket/socket-server");
const player_model_1 = __importDefault(require("../databases/mongo/models/player-model"));
const gracefulShutdown = async (server) => {
    process.on('SIGTERM', async () => {
        console.info('SIGTERM сигнал получен');
        server.close(() => {
            console.log('Http сервер остановлен');
        });
        socket_server_1.io.close(async () => {
            await player_model_1.default.remove();
            console.log('Socket сервер остановлен');
        });
    });
};
exports.default = gracefulShutdown;
//# sourceMappingURL=shutdown-utill.js.map