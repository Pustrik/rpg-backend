"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exceptions_1 = __importDefault(require("../../exteptions/api-exceptions"));
const token_service_1 = __importDefault(require("../../services/token-service"));
const passport = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return next(api_exceptions_1.default.unauthorizedError());
        const access_token = authHeader.split(' ')[1];
        if (!access_token)
            return next(api_exceptions_1.default.unauthorizedError());
        const userData = token_service_1.default.validateAccess(access_token);
        if (!userData)
            return next(api_exceptions_1.default.unauthorizedError());
        req.user = userData;
        next();
    }
    catch (e) {
        return next(api_exceptions_1.default.unauthorizedError());
    }
};
exports.default = passport;
//# sourceMappingURL=passport.js.map