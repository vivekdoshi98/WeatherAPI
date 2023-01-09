import mongoose, { Types } from "mongoose";
import currentTemp, { currentTempDocument,currentTempSchema } from "./currentTemp";

export interface auditTempDocument extends mongoose.Document{
    cityId:number,
    cityName:string,
    records:Types.DocumentArray<currentTempDocument>
}

const auditTemp = new mongoose.Schema({
    cityId: {type:Number},
    cityName: {type:String},
    records: [{type:currentTempSchema}]
}) ;

export default mongoose.model<auditTempDocument>('AuditTemp',auditTemp);