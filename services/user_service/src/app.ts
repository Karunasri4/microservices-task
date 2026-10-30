import express from "express"
import userRoutes from "./routes/user.routes"
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { emailQueue } from "../src/queues/email.queue";
const app=express()
app.use(express.json());
app.use("/users",userRoutes)

const serverAdapter=new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")

createBullBoard({
    queues:[new BullMQAdapter(emailQueue)],
    serverAdapter,
});

app.use("/admin/queues",serverAdapter.getRouter())

export default app