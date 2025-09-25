import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from "./utils/env.js";
import {getAllFriends, getFriendById}  from "../src/services/friends.js";


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

    app.get("/friends", async (req, res) => {
        const friends = await getAllFriends();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: friends,
        });
    });
    app.get("/friends/:id", async (req, res) => {
        const { id } = req.params;
        const friend = await getFriendById(id);

        if (!friend) {
            res.status(404).json({
                message: 'Friend not found'
            });
            return;
	}
        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data: friend
        });
    })



    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((error, req, res, next) => {
        res.status(500).json({
            message:error.message,
        })
        next();
    })
   
    const PORT = Number(env("PORT")) || 3000;

    app.listen(PORT, () =>console.log(`Server is running on port ${PORT}`));

};