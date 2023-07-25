"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user-model"));
const postgres_db_1 = require("../postgres-db");
class Class extends sequelize_1.Model {
}
exports.Class = Class;
Class.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    health: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    damage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    attack_type: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ability: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'classes',
    timestamps: false,
    sequelize: postgres_db_1.postgres,
    freezeTableName: true
});
user_model_1.default.belongsTo(Class, { foreignKey: 'class_id' });
Class.hasMany(user_model_1.default, { foreignKey: 'class_id' });
//# sourceMappingURL=class-model.js.map