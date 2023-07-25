import {login, registration, logout, refresh, allActiveUsers} from "../services/user-service"
import { Request, Response } from 'express'
import userValidation from "../utills/validation-utill";
import {UsersRepo} from "../repositories/postgres/users-repo";

export default class AuthController {
        static async login(req: Request, res: Response) {
                const {username, password} = req.body;
                const userData = await login(username, password);
                const classId = await UsersRepo.getByName(username);
                res.cookie('refresh_token', userData.refresh_token, {maxAge: 60*60*100, httpOnly: true});
                return res.status(200).json({...userData, class_id: classId.class_id});
        }

        static async registration(req: Request, res: Response) {
                const {username, email, password, password_d, class_id} = req.body;
                userValidation(username, password, password_d, email);
                const userData = await registration(username, email, password, class_id);
                res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
                return res.status(200).json(userData);
        }

        static async logout(req: Request, res: Response) {
                const {refreshToken} = req.cookies;
                const token = await logout(refreshToken);
                res.clearCookie('refresh_token');
                return res.json(token);
        }

        static async refresh(req: Request, res: Response) {
                const refreshToken: string = req.cookies.refresh_token;
                const userData = await refresh(refreshToken);
                const classId = (await UsersRepo.getByName(userData.user.username)).class_id;
                res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
                return res.json({...userData, class_id: classId});
        }

        static async allUsers(req: Request, res: Response) {
                const users = await allActiveUsers();
                return res.json(users);
        }
}