import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
    //timestamps tells mongoose to assign createdAt and updatedAt values
}, { timestamps: true })

//TODO: functionality to compare password for user etc

export default mongoose.model<UserDocument>('User', userSchema);