import mongoose, { Document } from "mongoose";
import { UserDocument } from './user.model'; 

export interface DailyNoticesDocument extends Document {
    id: DailyNoticesDocument["_id"];
    userId: UserDocument["_id"];
    message: string;
    author: string;
    start_date: Date;
    expiry_date: Date;
    createdAt: Date;
    updatedAt: string;
}

const dailyNoticesSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: String,
    author: String,
    start_date: String,
    expiry_date: String
}, { timestamps: true })


export default mongoose.model<DailyNoticesDocument>('DailyNotices', dailyNoticesSchema);