import  express  from "express";
import controller from "../controller/GetData";
import middleware from "../middlerware/Middleware";

const router =express.Router();

//Middleware auth will first check prime date or not.
//router.use(middleware.checkDatePrime);

// /api/getWeatherData api route
router.get("/",middleware.checkDatePrime,controller.getData);


export default router;