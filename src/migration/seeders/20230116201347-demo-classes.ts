'use strict';

import {DamageType} from "../../entityes/characters";
import getCurrentDate from "../../utills/current-time-utill";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('classes', [
      {
        id: 0,
        name: 'Warrior',
        health: 200,
        damage: 50,
        attack_type: DamageType.PHYSICAL,
        ability: 'Невосприимчив к физическому урону',
        created_at: getCurrentDate(),
        updated_at: getCurrentDate()
      },
      {
        id: 1,
        name: 'Mage',
        health: 80,
        damage: 100,
        attack_type: DamageType.MAGICAL,
        ability: 'Нельзя применять способность',
        created_at: getCurrentDate(),
        updated_at: getCurrentDate()
      },
      {
        id: 2,
        name: 'Thief',
        health: 100,
        damage: 25,
        attack_type: DamageType.PHYSICAL,
        ability: 'Ушел в тень',
        created_at: getCurrentDate(),
        updated_at: getCurrentDate()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('classes', null, {});
  }
};
