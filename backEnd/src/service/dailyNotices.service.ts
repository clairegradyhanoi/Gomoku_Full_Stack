
import mongoose, { DocumentDefinition, FilterQuery, Types } from "mongoose";
import dailyNoticesModel, { DailyNoticesDocument } from "../model/dailyNotices.model";

export async function getDailyNoticesByUserId(userId: string) {
    return await dailyNoticesModel.find({ userId: userId} ).lean()
}

export async function getOne(query: FilterQuery<DailyNoticesDocument>){
    return await dailyNoticesModel.findOne(query)
}

export async function updateDailyNotices(
  userId: Types.ObjectId,
  input: DocumentDefinition<DailyNoticesDocument>
) {
  return dailyNoticesModel.findOneAndUpdate(
    {
      userId: new mongoose.Types.ObjectId(userId)
    },
    input,
    { new: true } // new option to true to return the document after update was applied.
  )
}

export async function createDailyNotices(
  input: DocumentDefinition<DailyNoticesDocument>
  
) 
{
  return dailyNoticesModel.create(input)
}

export async function deleteDailyNoticesByUserId(query: FilterQuery<DailyNoticesDocument>) {
  return dailyNoticesModel.findOneAndDelete(query)
}
