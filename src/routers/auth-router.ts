import express from 'express';
import passport from '../middleware/http-middleware/passport';
import 'express-async-errors'
import {errorLoggerHttp, errorResponderHttp} from "../middleware/http-middleware/errorhandler";
import AuthController from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/registration', AuthController.registration);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/refresh', AuthController.refresh);
authRouter.get('/users', passport, AuthController.allUsers);
authRouter.use(errorLoggerHttp);
authRouter.use(errorResponderHttp);
export default authRouter;