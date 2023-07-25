module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      health: {
        type: Sequelize.INTEGER,
      },
      damage: {
        type: Sequelize.INTEGER,
      },
      attack_type: {
        type: Sequelize.INTEGER,
      },
      ability: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('classes');
  }
};