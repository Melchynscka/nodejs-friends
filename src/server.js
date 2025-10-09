import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from "./utils/env.js";
import friendsRouter from "./routers/friends.js";
import authRouter from './routers/auth.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import cookieParser from 'cookie-parser';

export const setupServer = () => {
    
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
    app.use(logger);
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    // routes

    app.use("/friends", friendsRouter);
    app.use("/auth", authRouter);

    app.use(notFoundHandler);

    app.use(errorHandler)
   
    const PORT = Number(env("PORT")) || 3000;

    app.listen(PORT, () =>console.log(`Server is running on port ${PORT}`));

};