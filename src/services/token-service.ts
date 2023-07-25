import * as jwt from "jsonwebtoken";
import token_model from "../databases/mongo/models/token-model";
import {userDto} from "../dtos/user-dto";
import {ITokenPair} from "../../interfaces/i-token";
import dotenv from 'dotenv';
dotenv.config();

export default class TokenService {
    static generate(payload) {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '3h'});
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'});

        return {access_token, refresh_token};
    }

    static async save(userId: string, refreshToken: string) {
        const tokenData = await token_model.findOne({user: userId});
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return await tokenData.save();
        }
        const token = await token_model.create({user: userId, refresh_token: refreshToken});
        return token;
    }

    static async remove(refreshToken: string) {
        const tokenData = await token_model.deleteOne({refresh_token: refreshToken});
        return tokenData;
    }

    static async find(refreshToken: string) {
        const tokenData = await token_model.findOne({refresh_token: refreshToken});
        return tokenData;
    }

    static validateAccess(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static validateRefresh(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static async user(user) {
        const usersDto = userDto(user);
        const tokens: ITokenPair = this.generate({...usersDto});
        await this.save(usersDto.id, tokens.refresh_token);
        return {user: usersDto, ...tokens};
    }
}