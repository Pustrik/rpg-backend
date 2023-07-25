"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не зарегестрирован');
    }
    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static wrongAction(message) {
        return new ApiError(400, message);
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-exceptions.js.map