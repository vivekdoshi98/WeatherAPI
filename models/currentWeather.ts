import mongoose from "mongoose";

export interface currentWeatherDocument extends mongoose.Document{
    cityId: number,
    cityName: string,
    dt: number,
    visibility: number,
    wind: {
        speed: number,
        deg: number,
    },
    clouds: {
        all: number,
    },
    sys: {
        type: number,
        id: number,
        country:string,
        sunrise: number,
        sunset: number
    }
}

const currentWeather = new mongoose.Schema({
    cityId: {type:Number},
    cityName: {type:String},
    dt: {type:Number},
    visibility: {type:Number},
    wind: {
        speed: {type:Number},
        deg: {type:Number},
    },
    clouds: {
        all: {type:Number},
    },
    sys: {
        type: {type:Number},
        id: {type:Number},
        country: {type:String},
        sunrise: {type:Number},
        sunset: {type:Number}
    }
}) ;


export default mongoose.model<currentWeatherDocument>('CurrentWeather',currentWeather);
