import sequelize from "./config/database";
import app from "./app";
import dotenv from "dotenv"
dotenv.config()

const PORT=process.env.PORT 
const startServer=async()=>{
    try{
        await sequelize.authenticate()
        console.log("database connected")
        app.listen(PORT,()=>{
            console.log("user-service running at port number: ",PORT)
        })
    }
    catch(error){
        console.log("user-service database connection failed:", error)
    }
}
startServer();