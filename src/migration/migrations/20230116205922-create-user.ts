module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
                id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    primaryKey: true
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                class_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: 'classes'
                        },
                        key: 'id'
                    }
                },
                created_at: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                updated_at: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
            });
    },
    async down(queryInterface, Sequelize) {
        return await queryInterface.dropTable('users');
    }
};