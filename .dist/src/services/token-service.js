"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const token_model_1 = __importDefault(require("../databases/mongo/models/token-model"));
const user_dto_1 = require("../dtos/user-dto");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenService {
    static generate(payload) {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '3h' });
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '30d' });
        return { access_token, refresh_token };
    }
    static async save(userId, refreshToken) {
        const tokenData = await token_model_1.default.findOne({ user: userId });
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return await tokenData.save();
        }
        const token = await token_model_1.default.create({ user: userId, refresh_token: refreshToken });
        return token;
    }
    static async remove(refreshToken) {
        const tokenData = await token_model_1.default.deleteOne({ refresh_token: refreshToken });
        return tokenData;
    }
    static async find(refreshToken) {
        const tokenData = await token_model_1.default.findOne({ refresh_token: refreshToken });
        return tokenData;
    }
    static validateAccess(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    static validateRefresh(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    static async user(user) {
        const usersDto = (0, user_dto_1.userDto)(user);
        const tokens = this.generate(Object.assign({}, usersDto));
        await this.save(usersDto.id, tokens.refresh_token);
        return Object.assign({ user: usersDto }, tokens);
    }
}
exports.default = TokenService;
//# sourceMappingURL=token-service.js.map