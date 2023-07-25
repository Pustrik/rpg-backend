"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
const messages_repo_1 = __importDefault(require("../../repositories/redis/messages-repo"));
exports.redis = null;
class RedisDB {
    constructor() {
        exports.redis = (0, redis_1.createClient)();
    }
    async connect() {
        await exports.redis.connect()
            .then(() => {
            console.log('Connected to redisDB');
            if (!exports.redis.exists('messages'))
                messages_repo_1.default.write({ username: '', message: '' });
        })
            .catch((e) => console.log('Cant connect to redisDB: ' + e));
    }
}
exports.default = new RedisDB();
//# sourceMappingURL=redis-db.js.map