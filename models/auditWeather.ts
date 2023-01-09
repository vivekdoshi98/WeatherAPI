import mongoose, { Types } from "mongoose";
import currentWeather, { currentWeatherDocument,currentWeatherSchema } from "./currentWeather";

export interface auditWeatherDocument extends mongoose.Document{
    cityId:number,
    cityName:string,
    records:Types.DocumentArray<currentWeatherDocument>
}
const auditWeather = new mongoose.Schema({
    cityId: {type:Number},
    cityName: {type:String},
    records: [{type:currentWeatherSchema}]
}) ;

export default mongoose.model<auditWeatherDocument>('AuditWeather',auditWeather);