"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("../middleware/socket-middleware/errorhandler"));
const listeners_service_1 = __importDefault(require("../services/listeners-service"));
const startListeners = (socket) => {
    console.info('Message received from ' + socket.id);
    socket.on('handshake', (0, errorhandler_1.default)(async (user, callback) => {
        await listeners_service_1.default.handshake(socket, user, callback);
    }, socket.id));
    socket.on('disconnect', (0, errorhandler_1.default)(async () => {
        await listeners_service_1.default.disconnect(socket);
    }, socket.id));
    socket.on('attack', (0, errorhandler_1.default)(async (winger, victim) => {
        await listeners_service_1.default.attack(socket, winger, victim);
    }, socket.id));
    socket.on('revive', (0, errorhandler_1.default)(async (player) => {
        await listeners_service_1.default.revive(socket, player);
    }, socket.id));
    socket.on('spell', (0, errorhandler_1.default)(async (player, victim) => {
        await listeners_service_1.default.spell(socket, player, victim);
    }, socket.id));
    socket.on('message', (0, errorhandler_1.default)(async (message) => {
        await listeners_service_1.default.message(socket, message);
    }, socket.id));
};
exports.default = startListeners;
//# sourceMappingURL=socket-listeners.js.map