import {changeUserData} from "../services/user-service";
import userValidation from "../utills/validation-utill";

export default class LobbyController {
        static async updateData(req, res, next) {
                const {id, username, password, password_d, password_old, class_id} = req.body;
                userValidation(username, password, password_d);
                const userData = await changeUserData(id, username, password, password_d, password_old, class_id);
                res.cookie('refresh_token', userData.refresh_token, {maxAge: 30*24*60*60*1000, httpOnly: true});
                return res.status(200).json(userData);
        }
}