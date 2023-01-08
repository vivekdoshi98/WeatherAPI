import { Request,Response,NextFunction } from "express";

class Middleware{
    /**
     * function : checkDatePrime
     * Desc: checks if system date is prime or not. If prime then continue 
     * with request else return no data message
     */
    async checkDatePrime(req:Request,res:Response,next:NextFunction){
        //console.log("-Middle Auth-");
        //just to ignore prime number validation
        if(typeof req.query.nocheck !== 'undefined'){
            next();
            return;
        }
        //getting system date
        const currentDate:Date=new Date();
        const currentDay:number=currentDate.getDate();
        
        // //Logic to check prime 
        // if(currentDay>3){
        //     for(let i=2;i<=Math.sqrt(currentDay);i++){
        //         if(currentDay%i===0){
        //             console.log("--not prime--")
        //             res.status(400).send("No data");
        //             res.end();
        //             return;
        //         }
        //     }
        // }

        //note: we can even use array of 32 marking prime numbers as 1 and directly check
        let primeDayArr:number[]=[0,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1];
        if(primeDayArr[currentDay]===0){
            //pre condition failed so stopping request
            res.status(412).json({message:"Date not prime so cannot provide data"});
            res.end();
            return;
        }

        //prime so moving ahead
        next();
    }
}

export default new Middleware();