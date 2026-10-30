import { Queue } from "bullmq";
import dotenv from "dotenv"
dotenv.config()
import bullmqConnection from "../config/bullmq";

const EMAIL_QUEUE_NAME="email-queue"
export const emailQueue=new Queue(EMAIL_QUEUE_NAME,{
    connection:bullmqConnection
})
emailQueue.on("error",(error)=>{
    console.log("email queue error:",error.message)
})

export const addWelcomeJobToQueue=async(to:string,name:string)=>{
    const addJob=emailQueue.add("welcome_email_job",{to,name},
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:2000
            },
            removeOnComplete:100,
            removeOnFail:100
        }
    )
}