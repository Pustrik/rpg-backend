import user_model from "../databases/mongo/models/user-model";
import * as bcrypt from 'bcrypt';
import ApiError from "../exteptions/api-exceptions";
import {UsersRepo} from "../repositories/postgres/users-repo";
import TokenService from "./token-service";

export async function registration(username: string, email: string, password: string, classId: string) {
    const candidate = await user_model.findOne({username: username});
    if(candidate)
        throw ApiError.badRequest('User exist');
    const hash = bcrypt.hashSync(password, 5);
    const user = await user_model.create({username: username, password: hash});
    await UsersRepo.add(user.id, username, email, hash, Number(classId));
    return await TokenService.user(user);
}
export async function login(username: string, password: string) {
    const user = await user_model.findOne({username});
    if(!user)
        throw ApiError.badRequest('User does not exist');
    const isEqual = bcrypt.compareSync(password, user.password);
    if(!isEqual)
        throw ApiError.badRequest('Wrong password');
    return await TokenService.user(user);
}

export async function logout(refreshToken: string) {
    return await TokenService.remove(refreshToken);
}

export async function refresh(refreshToken: string) {
    if(!refreshToken)
        throw ApiError.unauthorizedError();
    const userData = TokenService.validateRefresh(refreshToken);
    const tokenFromBb = await TokenService.find(refreshToken);
    if(!userData || !tokenFromBb)
        throw ApiError.unauthorizedError();
    const user = await user_model.findById(tokenFromBb.user);
    return await TokenService.user(user);
}

export async function allActiveUsers() {
    const users = await user_model.find();
    return users;
}

export async function changeUserData(id: string, username: string, password: string, password_d: string, passwordOld:string, classId: number) {
    const user = await UsersRepo.getById(id);
    const isEqual = bcrypt.compareSync(passwordOld, user.password);
    if(!isEqual)
        throw ApiError.badRequest('Не верный пароль');
    const isUnique = await UsersRepo.getByName(username);
    if(isUnique && isUnique.id != id)
        throw ApiError.badRequest('Юзернейм существует');
    const hash = bcrypt.hashSync(password, 5);
    await UsersRepo.update(id, username, hash, classId);
    const userMdb = await user_model.findById(id);
    userMdb.username = username;
    userMdb.password = hash;
    await userMdb.save();
    return await TokenService.user(userMdb);
}