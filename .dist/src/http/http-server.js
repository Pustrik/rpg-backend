"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerHttpStart = exports.httpServer = void 0;
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
exports.httpServer = http_1.default.createServer(app_1.default);
class ServerHttpStart {
    constructor(server, port) {
        server.listen(port, () => {
            console.log('Server run:\n' +
                'http://localhost:' + port + '\n' +
                'Frontend:\n' +
                'http://localhost:3000\n');
        });
    }
}
exports.ServerHttpStart = ServerHttpStart;
//# sourceMappingURL=http-server.js.map