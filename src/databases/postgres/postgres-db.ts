import {Sequelize} from "sequelize";

export let postgres = null;

class PostgresDB {
    constructor() {
        postgres = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,
            {
                host: 'localhost',
                dialect: 'postgres'
            });
    }

    async connect() {
        await postgres.authenticate()
            .then(() => console.log('Connected to postgresDB'))
            .catch((e) => console.log('Cant connect to postgresDB: ' + e))
    }
}

export default new PostgresDB();
