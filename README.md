# WeatherAPI
## API:-
/api/getWeatherData?city=cityToSearch

### Keys:-
city : city name you want to search. Optional key by default it will search for Pune.

### Eg:-
/api/getWeatherData?city=Delhi

## Setup:-
1) Clone repo
2) npm install
3) Create a local monogoDB database named weatherDB
4) npm start

## Schema:-
There are 5 collections:-
1) City - holds data related to a city
2) CurrentTemps - holds current temperature details for a given city
3) CurrentWeather - holds current weather details for a given city
4) AuditTemps - holds temperature history for a given city.
5) AuditWeather - holds weather history for a given city.

Temps and weather tables are updated based on "dt" field. If values of dt is greater than what is present in database for a given city then current details tables get updated and new element is added in audit tables' record object.



