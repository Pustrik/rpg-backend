import {createClient} from "redis";
import MessagesRepo from "../../repositories/redis/messages-repo";

export let redis = null;

class RedisDB {

    constructor() {
        redis = createClient();
    }

    async connect() {
        await redis.connect()
            .then(() => {
                console.log('Connected to redisDB');
                if(!redis.exists('messages')) MessagesRepo.write({username:'', message:''});
            })
            .catch((e) => console.log('Cant connect to redisDB: ' + e))
    }
}

export default new RedisDB();
