"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_router_1 = __importDefault(require("./routers/auth-router"));
const lobby_router_1 = __importDefault(require("./routers/lobby-router"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const requesthandler_1 = __importDefault(require("./middleware/http-middleware/requesthandler"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.ORIGIN
}));
app.use((0, cookie_parser_1.default)());
app.use(requesthandler_1.default);
app.use('/rpg', auth_router_1.default);
app.use('/rpg', lobby_router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map