import { Request,Response } from "express";
import axios, { AxiosResponse } from "axios";
import {config} from "../config/config";
import * as dbService from "../DB/service";


/**
 * GET - /api/v1/getWeatherData
 * Desc - returns weather data
 */
const getData =async (req:Request,res:Response) =>{
    try{   
        //key city is optional in query - default value Pune
        let cityToSearch:string=<string>req.query.city || 'Pune';

        //get data from open weather api
        let owaRes: AxiosResponse<any, any> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${config.owa.key}`);
        
        updateDatabase(cityToSearch,owaRes);

        //sending appr. response
        res.status(200).json(owaRes.data);

        
    }
    catch (err) {
        console.log(err);
    }

}

async function updateDatabase(cityToSearch:string,owaRes:AxiosResponse<any, any>) {
    //checking if city data present in db
    const cityRec = await dbService.findCity(cityToSearch);

    if (cityRec) {
        //city exists in our table

        //getting last date time of the weather record
        const cityTemp = await dbService.findCityTemp(cityRec.cityId);

        if (cityTemp) {
            const lastDT = cityTemp.dt;
            //comparing owa dt and latest dt of our db
            if (owaRes.data.dt > lastDT) {
                //new weather details found so updating current details of db
                const currTempData = {
                    cityId: owaRes.data.id,
                    cityName: owaRes.data.name,
                    dt: owaRes.data.dt,
                    weather: {
                        id: owaRes.data.weather.id,
                        main: owaRes.data.weather.main,
                        description: owaRes.data.weather.description,
                        icon: owaRes.data.weather.icon
                    },
                    base: owaRes.data.base,
                    main: {
                        temp: owaRes.data.main.temp,
                        feels_like: owaRes.data.main.feels_like,
                        temp_min: owaRes.data.main.temp_min,
                        temp_max: owaRes.data.main.temp_max,
                        pressure: owaRes.data.main.pressure,
                        humidity: owaRes.data.main.humidity
                    }
                }

                const currWeatherData = {
                    cityId: owaRes.data.id,
                    cityName: owaRes.data.name,
                    dt: owaRes.data.dt,
                    visibility: owaRes.data.visibility,
                    wind: {
                        speed: owaRes.data.wind.speed,
                        deg: owaRes.data.wind.deg,
                    },
                    clouds: {
                        all: owaRes.data.clouds.all,
                    },
                    sys: {
                        type: owaRes.data.sys.type,
                        id: owaRes.data.sys.id,
                        country: owaRes.data.sys.country,
                        sunrise: owaRes.data.sys.sunrise,
                        sunset: owaRes.data.sys.sunset
                    }
                }
                dbService.updateCurrentTemperature(cityRec.cityId, currTempData);
                dbService.updateCurrentWeather(cityRec.cityId, currWeatherData);
            }
            //else console.log("already updated");
        }
    }
    else {
        //city not present in our db so adding all details
        dbService.createWeatherRecord(owaRes.data);
    }
}

export default { getData };