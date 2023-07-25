"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_server_1 = require("./http/http-server");
const socket_server_1 = __importDefault(require("./socket/socket-server"));
const dotenv_1 = __importDefault(require("dotenv"));
const shutdown_utill_1 = __importDefault(require("./utills/shutdown-utill"));
const connect_db_1 = require("./databases/connect-db");
dotenv_1.default.config();
const start = async () => {
    new http_server_1.ServerHttpStart(http_server_1.httpServer, process.env.PORT);
    new socket_server_1.default(http_server_1.httpServer);
    await (0, connect_db_1.connectDatabases)();
    await (0, shutdown_utill_1.default)(http_server_1.httpServer);
};
(async () => start())();
//# sourceMappingURL=index.js.map