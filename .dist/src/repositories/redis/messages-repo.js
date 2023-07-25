"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_db_1 = require("../../databases/redis/redis-db");
class MessagesRepo {
    static async write(message) {
        const size = await redis_db_1.redis.LLEN('messages');
        if (size > 9)
            await this.remove();
        await redis_db_1.redis.LPUSH('messages', JSON.stringify(message));
    }
    static async remove() {
        await redis_db_1.redis.RPOP('messages');
    }
    static async getCache() {
        const rez = await redis_db_1.redis.LRANGE('messages', 0, 9);
        return rez.map((mes) => JSON.parse(mes));
    }
}
exports.default = MessagesRepo;
//# sourceMappingURL=messages-repo.js.map