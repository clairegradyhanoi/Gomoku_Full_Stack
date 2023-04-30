import express, { Request, Response } from 'express'; 
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { createDailyNotices, getDailyNoticesByUserId, updateDailyNotices, getOne, deleteDailyNoticesByUserId } from '../service/dailyNotices.service';
import { createDailyNoticesSchema, updateDailyNoticesSchema, getDailyNoticesByIdSchema } from '../schema/dailyNotices.schema';
const dailyNoticesHandler = express.Router();
let gameId: number;
let currentPlayer: string

dailyNoticesHandler.get("/:userId", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const userId = req.params.userId
    try{
        const userGames = await getDailyNoticesByUserId(userId);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.get("/", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const userId = req.userId
    try{
        const userGames = await getDailyNoticesByUserId(userId);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.get("/:userId/:gameId", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const g_Id = req.params.gameId
    const userId = req.params.userId
    try{
        const oneGame = await getOne({ gameId: { $eq: g_Id }, userId: { $eq: userId }} );
        return res.status(200).send(oneGame);
    }catch (err) {
        return res.status(500).send(err);
    }
});


dailyNoticesHandler.post("/", validateSchema(createDailyNoticesSchema), async (req: Request, res: Response) => {
     const game = req.body
     currentPlayer = game.result
     const userId = new mongoose.Types.ObjectId(req.userId)
     const newGame = await createDailyNotices({ ...game, userId})
     return res.status(200).json({"message":`${currentPlayer}`})
 })


 dailyNoticesHandler.delete("/:userId/:gameId", validateSchema(updateDailyNoticesSchema), async (req: Request, res: Response) => {
     const gameId = req.params.gameId as unknown as number
     const userId = req.params.userId
     const deleteGameUpdate = await deleteDailyNoticesByUserId({gameId: { $eq: gameId}, userId: {$eq: userId}})
     return res.status(200).send(deleteGameUpdate)
 })

 dailyNoticesHandler.put("/", validateSchema(updateDailyNoticesSchema), async (req: Request, res: Response) => {
     const gameUpdate = req.body
     const userId = new mongoose.Types.ObjectId(req.userId)
     gameId = gameUpdate.gameId
     return res.status(200).json({"message":`${currentPlayer}`})
 })

export default dailyNoticesHandler;