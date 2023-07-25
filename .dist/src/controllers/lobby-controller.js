"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user-service");
const validation_utill_1 = __importDefault(require("../utills/validation-utill"));
class LobbyController {
    static async updateData(req, res, next) {
        const { id, username, password, password_d, password_old, class_id } = req.body;
        (0, validation_utill_1.default)(username, password, password_d);
        const userData = await (0, user_service_1.changeUserData)(id, username, password, password_d, password_old, class_id);
        res.cookie('refresh_token', userData.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json(userData);
    }
}
exports.default = LobbyController;
//# sourceMappingURL=lobby-controller.js.map