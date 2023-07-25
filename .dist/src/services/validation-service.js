"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exceptions_1 = __importDefault(require("../exteptions/api-exceptions"));
const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
class ValidationService {
    static password(pass, passDuplicate) {
        if (passDuplicate && pass != passDuplicate)
            throw api_exceptions_1.default.badRequest('Пароли не совпадают');
        if (pass.length < 4 || pass.length > 24)
            throw api_exceptions_1.default.badRequest('Не верная длинна пароля');
    }
    static username(username) {
        if (username.length < 4 || username.length > 14)
            throw api_exceptions_1.default.badRequest('Не верная длинна юзернейма');
    }
    static email(email) {
        if (!expression.test(email))
            throw api_exceptions_1.default.badRequest('Не верная почта');
    }
}
exports.default = ValidationService;
//# sourceMappingURL=validation-service.js.map