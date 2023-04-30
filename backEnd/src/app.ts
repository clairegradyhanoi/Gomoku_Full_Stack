 import express, { Express, Request, Response } from 'express';
 import dotenv from 'dotenv';
 import cors from "cors";
 import connectDB from './util/connectDB'; 
import dailyNoticesHandler from './handler/dailyNotices.handler'
import authHandler from './handler/auth.handler';

 dotenv.config();
 connectDB();
 const app: Express = express();
 const port = process.env.PORT;
 app.use(cors())
 app.use(express.json({ limit: '500kb' }));
 app.use('/api/dailyNotices', dailyNoticesHandler)
 app.use('/api/auth', authHandler)
// {
//         origin: process.env.allowHost || true
//     }

 export default app;