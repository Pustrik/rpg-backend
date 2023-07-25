"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_service_1 = __importDefault(require("../../services/socket-service"));
const api_exceptions_1 = __importDefault(require("../../exteptions/api-exceptions"));
const errorHandler = (handler, socket) => {
    const handleError = (err) => {
        console.error('error', '', {
            message: 'Error Handler Socket',
            body: {
                inFunction: Object(handler).name,
                secretKey: undefined,
                publicKey: undefined
            },
            err
        });
        if (!(err instanceof api_exceptions_1.default)) {
            return socket_service_1.default.sendMessage('error', [socket]);
        }
        socket_service_1.default.sendMessage(err.message, [socket]);
    };
    return (...args) => {
        try {
            const ret = handler.apply(this, args);
            if (ret && typeof ret.catch === "function") {
                ret.catch(handleError);
            }
        }
        catch (e) {
            handleError(e);
        }
    };
};
exports.default = errorHandler;
//# sourceMappingURL=errorhandler.js.map