import mongoose from "mongoose";
import {config} from "../config/config";
mongoose.set('strictQuery',false);

const dbConnect=()=>{
    return mongoose.connect(config.db.url!)
    .then(()=>{
        console.log("Connected to DB!");
    })
    .catch((error)=>{
        console.log("Failed to connect to DB!\n Message: "+error);
        process.exit(1); //stopping program as no use to create server if db fails
    })
}

export default dbConnect;