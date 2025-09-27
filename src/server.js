import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from "./utils/env.js";
import friendsRouter from "./routers/friends.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

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

    // routes

    app.use("/friends", friendsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler)
   
    const PORT = Number(env("PORT")) || 3000;

    app.listen(PORT, () =>console.log(`Server is running on port ${PORT}`));

};