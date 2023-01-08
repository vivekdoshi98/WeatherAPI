import { DocumentDefinition } from "mongoose";
import City, { cityDocument } from "../models/city";
import currentTemp, { currentTempDocument } from "../models/currentTemp";
import currentWeather, { currentWeatherDocument } from "../models/currentWeather";

/**
 * function to get city details
 * @param cityToSearch - city name to search
 * @returns city record of type cityDocument
 */
export function findCity(cityToSearch:string){
    return City.findOne({cityName:cityToSearch});
}

/**
 * function to get current temperature of a given city
 * @param cityIdToSearch - city id to search
 * @returns temperature record
 */
export function findCityTemp(cityIdToSearch:number){
    return currentTemp.findOne({cityId:cityIdToSearch});
}

/**
 * function to update current temperature of a city
 * @param cityIdToSearch - city id to search
 * @param tempRecUpdate  - obj with updated record
 */
export function updateCurrentTemperature(cityIdToSearch:number,tempRecUpdate:DocumentDefinition<currentTempDocument>){
    currentTemp.findOneAndUpdate({cityId:cityIdToSearch},tempRecUpdate,{upsert:true})
    //.then(()=>console.log("Temp updated"))
    .catch((err)=>console.log("Error in updating current temp: ",err));
}

/**
 * function to update current weather of a city
 * @param cityIdToSearch - city id to search
 * @param wrtRecUpdate - obj with updated record
 */
export function updateCurrentWeather(cityIdToSearch:number,wrtRecUpdate:DocumentDefinition<currentWeatherDocument>){
    currentWeather.findOneAndUpdate({cityId:cityIdToSearch},wrtRecUpdate,{upsert:true})
    //.then(()=>console.log("weather updated"))
    .catch((err)=>console.log("Error in updating current weather: ",err));
}

/**
 * function to insert data in all collections 
 * @param owaRec - combined object holding data to be inserted
 */
export function createWeatherRecord(owaRec: any){
    const cityData= {
        cityName:owaRec.name,
        cityId:owaRec.id,
        timezone:owaRec.timezone,
        cod:owaRec.cod,
        countryId:owaRec.sys.country,
        coord:{
            lat:owaRec.coord.lat,
            lon:owaRec.coord.lon
        }
    }

    const currTempData= {
        cityId: owaRec.id,
        cityName:owaRec.name,
        dt: owaRec.dt,
        weather:{
            id: owaRec.weather.id,
            main: owaRec.weather.main,
            description: owaRec.weather.description,
            icon: owaRec.weather.icon
        },
        base: owaRec.base,
        main: {
            temp: owaRec.main.temp,
            feels_like: owaRec.main.feels_like,
            temp_min: owaRec.main.temp_min,
            temp_max: owaRec.main.temp_max,
            pressure: owaRec.main.pressure,
            humidity: owaRec.main.humidity
        }
    }

    const currWeatherData={
        cityId: owaRec.id,
        cityName:owaRec.name,
        dt: owaRec.dt,
        visibility: owaRec.visibility,
        wind: {
            speed: owaRec.wind.speed,
            deg: owaRec.wind.deg,
        },
        clouds: {
            all: owaRec.clouds.all,
        },
        sys: {
            type: owaRec.sys.type,
            id: owaRec.sys.id,
            country:owaRec.sys.country,
            sunrise: owaRec.sys.sunrise,
            sunset: owaRec.sys.sunset
        }
    }
    new City(cityData).save()
    .catch((err)=>{
        console.log("Error in inserting record in city");
    });
    new currentTemp(currTempData).save()
    .catch((err)=>{
        console.log("Error in inserting record in current temp");
    });
    new currentWeather(currWeatherData).save()
    .catch((err)=>{
        console.log("Error in inserting record in current weather");
    });
}

// export function insertCity(cityToInsert:DocumentDefinition<cityDocument>){
//     new City(cityToInsert).save().then(()=>console.log("City saved")).catch((err)=>console.log(err));
// }