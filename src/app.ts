import authRouter from './routers/auth-router';
import lobbyRouter from './routers/lobby-router';
import dotenv from 'dotenv';
import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import requestLogger from "./middleware/http-middleware/requesthandler";
const app = express();
dotenv.config();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}));
app.use(cookieParser());
app.use(requestLogger);

app.use('/rpg', authRouter);
app.use('/rpg', lobbyRouter);

export default app;

