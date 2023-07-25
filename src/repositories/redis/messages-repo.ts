import {redis} from "../../databases/redis/redis-db";
import IMessage from "../../interfaces/i-message";

export default class MessagesRepo {

    static async write(message: IMessage) {
        const size = await redis.LLEN('messages');
        if(size > 9)
            await this.remove();
        await redis.LPUSH('messages', JSON.stringify(message));
    }

    static async remove() {
        await redis.RPOP('messages');
    }

    static async getCache() {
        const rez: [] = await redis.LRANGE('messages', 0, 9);
        return rez.map((mes) => JSON.parse(mes));
    }
}