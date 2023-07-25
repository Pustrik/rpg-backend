"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const current_time_utill_1 = __importDefault(require("../../utills/current-time-utill"));
const class_model_1 = require("../../databases/postgres/models/class-model");
const user_model_1 = __importDefault(require("../../databases/postgres/models/user-model"));
class UsersRepo {
    static async add(id, username, email, password, class_id) {
        const userData = await user_model_1.default.create({
            id: id,
            username: username,
            email: email,
            password: password,
            class_id: class_id,
            created_at: (0, current_time_utill_1.default)(),
            updated_at: (0, current_time_utill_1.default)()
        });
        console.log(userData.toJSON());
        console.log(userData);
        return userData.toJSON();
    }
    static async getAll() {
        const users = await user_model_1.default.findAll({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at']
        });
        return users ? users.map((user) => user.toJSON()) : null;
    }
    static async getByName(username) {
        const userData = await user_model_1.default.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                username: username
            }
        });
        return userData ? userData.toJSON() : null;
    }
    static async getById(id) {
        const userData = await user_model_1.default.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                id: id
            }
        });
        return userData ? userData.toJSON() : null;
    }
    static async update(id, username, password, class_id) {
        const userData = await user_model_1.default.update({
            username: username,
            password: password,
            class_id: class_id,
            updated_at: (0, current_time_utill_1.default)()
        }, {
            where: {
                id: id
            }
        });
        return userData;
    }
    static async delete(id) {
        const userData = await user_model_1.default.destroy({
            where: {
                id: id
            }
        });
        return userData;
    }
    static async getJoined(username) {
        const a = await user_model_1.default.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                username: username
            },
            include: class_model_1.Class
        });
        return a.toJSON();
    }
}
exports.UsersRepo = UsersRepo;
//# sourceMappingURL=users-repo.js.map