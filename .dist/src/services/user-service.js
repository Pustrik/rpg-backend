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
exports.changeUserData = exports.allActiveUsers = exports.refresh = exports.logout = exports.login = exports.registration = void 0;
const user_model_1 = __importDefault(require("../databases/mongo/models/user-model"));
const bcrypt = __importStar(require("bcrypt"));
const api_exceptions_1 = __importDefault(require("../exteptions/api-exceptions"));
const users_repo_1 = require("../repositories/postgres/users-repo");
const token_service_1 = __importDefault(require("./token-service"));
async function registration(username, email, password, classId) {
    const candidate = await user_model_1.default.findOne({ username: username });
    if (candidate)
        throw api_exceptions_1.default.badRequest('User exist');
    const hash = bcrypt.hashSync(password, 5);
    const user = await user_model_1.default.create({ username: username, password: hash });
    await users_repo_1.UsersRepo.add(user.id, username, email, hash, Number(classId));
    return await token_service_1.default.user(user);
}
exports.registration = registration;
async function login(username, password) {
    const user = await user_model_1.default.findOne({ username });
    if (!user)
        throw api_exceptions_1.default.badRequest('User does not exist');
    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual)
        throw api_exceptions_1.default.badRequest('Wrong password');
    return await token_service_1.default.user(user);
}
exports.login = login;
async function logout(refreshToken) {
    return await token_service_1.default.remove(refreshToken);
}
exports.logout = logout;
async function refresh(refreshToken) {
    if (!refreshToken)
        throw api_exceptions_1.default.unauthorizedError();
    const userData = token_service_1.default.validateRefresh(refreshToken);
    const tokenFromBb = await token_service_1.default.find(refreshToken);
    if (!userData || !tokenFromBb)
        throw api_exceptions_1.default.unauthorizedError();
    const user = await user_model_1.default.findById(tokenFromBb.user);
    return await token_service_1.default.user(user);
}
exports.refresh = refresh;
async function allActiveUsers() {
    const users = await user_model_1.default.find();
    return users;
}
exports.allActiveUsers = allActiveUsers;
async function changeUserData(id, username, password, password_d, passwordOld, classId) {
    const user = await users_repo_1.UsersRepo.getById(id);
    const isEqual = bcrypt.compareSync(passwordOld, user.password);
    if (!isEqual)
        throw api_exceptions_1.default.badRequest('Не верный пароль');
    const isUnique = await users_repo_1.UsersRepo.getByName(username);
    if (isUnique && isUnique.id != id)
        throw api_exceptions_1.default.badRequest('Юзернейм существует');
    const hash = bcrypt.hashSync(password, 5);
    await users_repo_1.UsersRepo.update(id, username, hash, classId);
    const userMdb = await user_model_1.default.findById(id);
    userMdb.username = username;
    userMdb.password = hash;
    await userMdb.save();
    return await token_service_1.default.user(userMdb);
}
exports.changeUserData = changeUserData;
//# sourceMappingURL=user-service.js.map