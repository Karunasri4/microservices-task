import express from "express";
import router from "./routes/todo.routes";

const app=express()
app.use(express.json())
app.use("/todos",router)

export default app