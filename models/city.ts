import mongoose from "mongoose";

export interface cityDocument extends mongoose.Document{
    cityName: string,
    cityId: number,
    timezone: number,
    cod: number,
    countryId:number,
    coord:{
        lat:Number,
        lon:Number
    }
}

const citySchema = new mongoose.Schema({
    cityName: {type:String},
    cityId: {type:Number},
    timezone: {type:Number},
    cod: {type:Number},
    countryId:{type:String},
    coord:{
        lat:{type:Number},
        lon:{type:Number}
    }

}) ;

export default mongoose.model<cityDocument>('City',citySchema);