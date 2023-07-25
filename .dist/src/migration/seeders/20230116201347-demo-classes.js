'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const characters_1 = require("../../entityes/characters");
const current_time_utill_1 = __importDefault(require("../../utills/current-time-utill"));
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('classes', [
            {
                id: 0,
                name: 'Warrior',
                health: 200,
                damage: 50,
                attack_type: characters_1.DamageType.PHYSICAL,
                ability: 'Невосприимчив к физическому урону',
                created_at: (0, current_time_utill_1.default)(),
                updated_at: (0, current_time_utill_1.default)()
            },
            {
                id: 1,
                name: 'Mage',
                health: 80,
                damage: 100,
                attack_type: characters_1.DamageType.MAGICAL,
                ability: 'Нельзя применять способность',
                created_at: (0, current_time_utill_1.default)(),
                updated_at: (0, current_time_utill_1.default)()
            },
            {
                id: 2,
                name: 'Thief',
                health: 100,
                damage: 25,
                attack_type: characters_1.DamageType.PHYSICAL,
                ability: 'Ушел в тень',
                created_at: (0, current_time_utill_1.default)(),
                updated_at: (0, current_time_utill_1.default)()
            }
        ], {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('classes', null, {});
    }
};
//# sourceMappingURL=20230116201347-demo-classes.js.map