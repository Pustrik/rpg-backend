"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const current_time_utill_1 = __importDefault(require("../../utills/current-time-utill"));
const class_model_1 = require("../../databases/postgres/models/class-model");
class ClassesRepo {
    static async add(id, name, health, damage, attack_type, ability) {
        const userData = await class_model_1.Class.create({
            id: id,
            name: name,
            health: health,
            damage: damage,
            attack_type: attack_type,
            ability: ability,
            created_at: (0, current_time_utill_1.default)(),
            updated_at: (0, current_time_utill_1.default)()
        });
        return userData.toJSON();
    }
    static async getById(id) {
        const classData = await class_model_1.Class.findOne({
            attributes: ['id', 'name', 'health', 'damage', 'attack_type', 'ability', 'created_at', 'updated_at'],
            where: {
                id: id
            }
        });
        return classData.toJSON();
    }
    static async update(id, name, health, damage, attack_type, ability) {
        const classData = await class_model_1.Class.update({
            id: id,
            name: name,
            health: health,
            damage: damage,
            attack_type: attack_type,
            ability: ability,
            updated_at: (0, current_time_utill_1.default)()
        }, {
            where: {
                id: id
            }
        });
        return classData;
    }
    ;
}
exports.default = ClassesRepo;
//# sourceMappingURL=classes-repo.js.map