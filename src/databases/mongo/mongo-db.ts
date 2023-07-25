import * as mongoDB from "mongoose";
import dotenv from 'dotenv';
import SessionRepo from "../../repositories/mongo/session-repo";
mongoDB.set('strictQuery', false);
dotenv.config();

class MongoDB {

    constructor() {
    }

    async connect() {
        await mongoDB.connect(process.env.MONGODB_URL)
            .then(async () => {
                console.log('Connected to mongoDB');
                await SessionRepo.clear();
            })
            .catch((e) => console.log('Cant connect to mongoDB: ' + e))
    }
}

export default new MongoDB();
