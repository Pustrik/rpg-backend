"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/http-middleware/passport"));
require("express-async-errors");
const errorhandler_1 = require("../middleware/http-middleware/errorhandler");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const authRouter = express_1.default.Router();
authRouter.post('/login', auth_controller_1.default.login);
authRouter.post('/registration', auth_controller_1.default.registration);
authRouter.post('/logout', auth_controller_1.default.logout);
authRouter.get('/refresh', auth_controller_1.default.refresh);
authRouter.get('/users', passport_1.default, auth_controller_1.default.allUsers);
authRouter.use(errorhandler_1.errorLoggerHttp);
authRouter.use(errorhandler_1.errorResponderHttp);
exports.default = authRouter;
//# sourceMappingURL=auth-router.js.map