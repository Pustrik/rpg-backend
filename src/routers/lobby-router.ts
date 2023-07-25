import express from "express";
import passport from "../middleware/http-middleware/passport";
import {errorLoggerHttp, errorResponderHttp} from "../middleware/http-middleware/errorhandler";
import 'express-async-errors'
import LobbyController from "../controllers/lobby-controller";

const lobbyRouter = express.Router();

lobbyRouter.put('/update', passport, LobbyController.updateData);
lobbyRouter.use(errorLoggerHttp);
lobbyRouter.use(errorResponderHttp);
export default lobbyRouter;