"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
module.exports =
    {
        "development": {
            "username": process.env.USER,
            "password": process.env.PASSWORD,
            "database": process.env.DATABASE,
            "host": "localhost",
            "dialect": "postgres"
        },
        "test": {
            "username": process.env.USER,
            "password": process.env.PASSWORD,
            "database": process.env.DATABASE,
            "host": "localhost",
            "dialect": "postgres"
        },
        "production": {
            "username": process.env.USER,
            "password": process.env.PASSWORD,
            "database": process.env.DATABASE,
            "host": "localhost",
            "dialect": "postgres"
        }
    };
//# sourceMappingURL=database.js.map