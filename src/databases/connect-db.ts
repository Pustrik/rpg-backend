import PostgresDB from "./postgres/postgres-db";
import RedisDB from "./redis/redis-db";
import MongoDB from "./mongo/mongo-db";

export const connectDatabases = async () => {
        await RedisDB.connect();
        await PostgresDB.connect();
        await MongoDB.connect();
}
