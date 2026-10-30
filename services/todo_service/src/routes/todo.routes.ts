import { createTodoController,getTodosByUserIdController,updateTodoController,deleteTodoController } from "../controllers/todo.controllers";
import { Router } from "express";

const router=Router()

router.post("/",createTodoController)
router.get("/user/:userId",getTodosByUserIdController)
router.put("/:id",updateTodoController)
router.delete("/:id",deleteTodoController)

export default router