"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponderHttp = exports.errorLoggerHttp = void 0;
const api_exceptions_1 = __importDefault(require("../../exteptions/api-exceptions"));
const errorLoggerHttp = (error, req, res, next) => {
    if (!(error instanceof api_exceptions_1.default)) {
        console.error('\x1b[31m', 'Server error', error);
        return next(error);
    }
    console.error('\x1b[31m', 'error', {
        message: 'Error Handler Http',
        action: `Method:: ${req.method} url:: ${req.url}`,
        body: Object.assign(Object.assign({}, req.body), { secretKey: undefined, publicKey: undefined }),
        error
    });
    return next(error);
};
exports.errorLoggerHttp = errorLoggerHttp;
const errorResponderHttp = (error, req, res, next) => {
    if (!(error instanceof api_exceptions_1.default))
        return res.status(500).json({ message: 'Непредвиденная ошибка' });
    return res.status(error.status).json({ message: error.message, errors: error.errors });
};
exports.errorResponderHttp = errorResponderHttp;
//# sourceMappingURL=errorhandler.js.map