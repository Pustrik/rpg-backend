"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_service_1 = __importDefault(require("../services/validation-service"));
const userValidation = (username, password, passwordD, email) => {
    validation_service_1.default.username(username);
    validation_service_1.default.password(password, passwordD);
    if (email)
        validation_service_1.default.email(email);
};
exports.default = userValidation;
//# sourceMappingURL=validation-utill.js.map