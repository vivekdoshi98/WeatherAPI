import express from "express";
import {config} from "./config/config";
import dbConnect from "./DB/connect";
import getDataRouter from "./routes/GetData";

const app = express();


//connecting to mongo db and starting server
dbConnect().then(()=>{
    app.listen(config.server.port,()=> console.log("Listening at port 3000"));
});


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req:express.Request,res:express.Response)=>{
    res.status(200).json({message:"Welcome to weather api!  Api to use /api/getWeatherData  Keys:-  city : city name to search(by default Pune)  EG: /api/getWeatherData?city=Delhi"});
})

app.use("/api/getWeatherData",getDataRouter);



