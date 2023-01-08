
const DB_URL="mongodb://0.0.0.0:27017/WeatherDB";
const PORT=3000;
const OPENWEATHERAPI="ffb3336fc9f365cd17a31e4f9195a0e4";

export const config={
    db:{
        url:DB_URL
    },
    server:{
        port:PORT
    },
    owa:{
        key:OPENWEATHERAPI
    }
};