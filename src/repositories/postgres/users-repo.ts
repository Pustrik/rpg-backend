import IUserPDB from "../../interfaces/i-user-pdb";
import getCurrentDate from "../../utills/current-time-utill";
import {Class} from "../../databases/postgres/models/class-model";
import User from "../../databases/postgres/models/user-model";

export class UsersRepo {
    static async add(id: string, username: string, email: string, password: string, class_id: number): Promise<IUserPDB> {
        const userData = await User.create({
            id: id,
            username: username,
            email: email,
            password: password,
            class_id: class_id,
            created_at: getCurrentDate(),
            updated_at: getCurrentDate()
        });

        console.log(userData.toJSON());
        console.log(userData);
        return userData.toJSON();

    }

    static async getAll(): Promise<IUserPDB[]> | null {
        const users = await User.findAll(
            {
                attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at']
            });
        return users ? users.map((user) => user.toJSON()) : null;

    }

    static async getByName(username: string): Promise<IUserPDB> | null {
        const userData = await User.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                username: username
            }
        });
        return userData ? userData.toJSON() : null;

    }

    static async getById(id: string): Promise<IUserPDB> | null {
        const userData = await User.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                id: id
            }
        });
        return userData ? userData.toJSON() : null;
    }

    static async update(id: string, username: string, password: string, class_id: number) {
        const userData = await User.update(
            {
                username: username,
                password: password,
                class_id: class_id,
                updated_at: getCurrentDate()
            },
            {
                where: {
                    id: id
                }
            }
        );
        return userData;
    }

    static async delete(id: string) {
        const userData = await User.destroy({
            where: {
                id: id
            }
        });
        return userData;
    }

    static async getJoined(username: string) {
        const a: any = await User.findOne({
            attributes: ['id', 'username', 'email', 'password', 'class_id', 'created_at', 'updated_at'],
            where: {
                username: username
            },
            include: Class
        });
        return a.toJSON();
    }
}
