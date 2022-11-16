import mongoose, { Document } from "mongoose";
import { UserDocument } from './user.model'; 

export interface GamesDocument extends Document {
    id: GamesDocument["_id"];
    userId: UserDocument["_id"];
    gameId: number;
    boardsize: number;
    result: string;
    whiteMoves: Array<number>;
    blackMoves: Array<number>;
    status: any[];
    date: Date;
    createdAt: Date;
    updatedAt: string;
}

const gamesSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    gameId: Number,
    boardsize: Number,
    result: String,
    whiteMoves: Array<number>,
    blackMoves: Array<number>,
    status: Array<any>,
    date: String
}, { timestamps: true })


export default mongoose.model<GamesDocument>('Games', gamesSchema);