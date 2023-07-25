"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgres = void 0;
const sequelize_1 = require("sequelize");
exports.postgres = null;
class PostgresDB {
    constructor() {
        exports.postgres = new sequelize_1.Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
            host: 'localhost',
            dialect: 'postgres'
        });
    }
    async connect() {
        await exports.postgres.authenticate()
            .then(() => console.log('Connected to postgresDB'))
            .catch((e) => console.log('Cant connect to postgresDB: ' + e));
    }
}
exports.default = new PostgresDB();
//# sourceMappingURL=postgres-db.js.map