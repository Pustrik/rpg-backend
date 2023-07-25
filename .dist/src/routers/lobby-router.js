"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/http-middleware/passport"));
const errorhandler_1 = require("../middleware/http-middleware/errorhandler");
require("express-async-errors");
const lobby_controller_1 = __importDefault(require("../controllers/lobby-controller"));
const lobbyRouter = express_1.default.Router();
lobbyRouter.put('/update', passport_1.default, lobby_controller_1.default.updateData);
lobbyRouter.use(errorhandler_1.errorLoggerHttp);
lobbyRouter.use(errorhandler_1.errorResponderHttp);
exports.default = lobbyRouter;
//# sourceMappingURL=lobby-router.js.map