"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user-service");
const validation_utill_1 = __importDefault(require("../utills/validation-utill"));
const users_repo_1 = require("../repositories/postgres/users-repo");
class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        const userData = await (0, user_service_1.login)(username, password);
        const classId = await users_repo_1.UsersRepo.getByName(username);
        res.cookie('refresh_token', userData.refresh_token, { maxAge: 60 * 60 * 100, httpOnly: true });
        return res.status(200).json(Object.assign(Object.assign({}, userData), { class_id: classId.class_id }));
    }
    static async registration(req, res) {
        const { username, email, password, password_d, class_id } = req.body;
        (0, validation_utill_1.default)(username, password, password_d, email);
        const userData = await (0, user_service_1.registration)(username, email, password, class_id);
        res.cookie('refresh_token', userData.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json(userData);
    }
    static async logout(req, res) {
        const { refreshToken } = req.cookies;
        const token = await (0, user_service_1.logout)(refreshToken);
        res.clearCookie('refresh_token');
        return res.json(token);
    }
    static async refresh(req, res) {
        const refreshToken = req.cookies.refresh_token;
        const userData = await (0, user_service_1.refresh)(refreshToken);
        const classId = (await users_repo_1.UsersRepo.getByName(userData.user.username)).class_id;
        res.cookie('refresh_token', userData.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json(Object.assign(Object.assign({}, userData), { class_id: classId }));
    }
    static async allUsers(req, res) {
        const users = await (0, user_service_1.allActiveUsers)();
        return res.json(users);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth-controller.js.map