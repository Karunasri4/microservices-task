
import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import { sendWelcomeEmail } from "./mailer";
import bullmqConnection from "./bullmq";

const EMAIL_QUEUE_NAME = "email-queue";
const worker = new Worker(EMAIL_QUEUE_NAME,async(job)=>{
  const {to,name}=job.data
  console.log(`Job ${job.id} (${job.name}) sening welcome mail to ${to}`)
  await sendWelcomeEmail(to,name)

},{
  connection:bullmqConnection,
  concurrency:5
}
)

worker.on("completed", (job) =>{
   console.log(`Job ${job.id} completed`)
});
worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`)
});

worker.on("error", (err) => {
  console.log("worker error:", err.message)
});

console.log("email_service worker is waiting for jobs...");
