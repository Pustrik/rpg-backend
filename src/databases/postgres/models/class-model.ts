import {DataTypes, Model, Optional} from 'sequelize'
import IClassPDB from "../../../../interfaces/i-class-pdb";
import User from "./user-model";
import {postgres} from "../postgres-db";

export interface ClassInput extends Optional<IClassPDB, null> {
}

export interface ClassOuput extends Required<IClassPDB> {
}

class Class extends Model<IClassPDB, ClassInput> implements IClassPDB {
    public id!: number;
    public name!: string;
    public health!: number;
    public damage!: number;
    public attack_type!: number;
    public ability!: string;
    public created_at!: string;
    public updated_at!: string;
}

Class.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        damage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack_type: {
            type: DataTypes.INTEGER,
        },
        ability: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'classes',
        timestamps: false,
        sequelize: postgres,
        freezeTableName: true
    });

User.belongsTo(Class, {foreignKey: 'class_id'});
Class.hasMany(User, {foreignKey: 'class_id'});

export {Class};