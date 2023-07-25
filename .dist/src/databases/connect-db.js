"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabases = void 0;
const postgres_db_1 = __importDefault(require("./postgres/postgres-db"));
const redis_db_1 = __importDefault(require("./redis/redis-db"));
const mongo_db_1 = __importDefault(require("./mongo/mongo-db"));
const connectDatabases = async () => {
    await redis_db_1.default.connect();
    await postgres_db_1.default.connect();
    await mongo_db_1.default.connect();
};
exports.connectDatabases = connectDatabases;
//# sourceMappingURL=connect-db.js.map