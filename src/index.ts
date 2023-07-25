import {httpServer, ServerHttpStart} from "./http/http-server";
import ServerSocketStart from "./socket/socket-server";
import dotenv from 'dotenv';
import gracefulShutdown from "./utills/shutdown-utill";
import {connectDatabases} from "./databases/connect-db";

dotenv.config();

const bootstrap = async () => {
    new ServerHttpStart(httpServer, process.env.PORT);
    new ServerSocketStart(httpServer);
    await connectDatabases();
    await gracefulShutdown(httpServer);
}

bootstrap();
