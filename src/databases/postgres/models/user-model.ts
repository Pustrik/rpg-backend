import {DataTypes, Model, Optional} from 'sequelize'
import IUserPDB from "../../../../interfaces/i-user-pdb";
import {postgres} from "../postgres-db";
export interface UserInput extends Optional<IUserPDB, null> {
}

export interface UserOutput extends Required<IUserPDB> {
}

class User extends Model<IUserPDB, UserInput> implements IUserPDB {
    public id!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public class_id!: number;
    public created_at!: string;
    public updated_at!: string;
}

User.init({
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'users',
        timestamps: false,
        sequelize: postgres,
        freezeTableName: true
});

export default User;

