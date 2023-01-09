import mongoose from "mongoose";

export interface currentTempDocument extends mongoose.Document{
    cityId: number,
    cityName: String,
    dt: number,
    weather:{
        id: number,
        main: string,
        description: string,
        icon: string
    },
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    }
}

export const currentTempSchema = new mongoose.Schema({
    cityId: {type:Number},
    cityName: {type:String},
    dt: {type:Number},
    weather:{
        id: {type:Number},
        main: {type:String},
        description: {type:String},
        icon: {type:String}
    },
    base: {type:String},
    main: {
        temp: {type:Number},
        feels_like: {type:Number},
        temp_min: {type:Number},
        temp_max: {type:Number},
        pressure: {type:Number},
        humidity: {type:Number},
    }
}) ;
export default mongoose.model<currentTempDocument>('CurrentTemp',currentTempSchema);
