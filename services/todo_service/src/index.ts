import { listen } from "node:quic";
import app from "./app";
import dotenv from "dotenv"
dotenv.config()
import sequelize from "./config/db";
import { start } from "repl";
const PORT=process.env.PORT
const startServer=async()=>{
    try{
        sequelize.authenticate()
        console.log("todo-service database connected")

        app.listen(PORT,()=>{
            console.log("todo-service running at port number :",PORT)
        })
    }
    catch(err){
        throw err
    }
}
startServer()