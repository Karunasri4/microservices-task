import { Request, Response } from "express";
import { createTodo,updateTodo,deleteTodo, getTodoByUser } from "../services/todo.services";
import { fetchUserById } from "../clients/user.clients";

export const createTodoController=async(req:Request,res:Response)=>{
    try{
        const { title, userId }=req.body
        const id=Number(userId)
        if(isNaN(id)){
            return res.status(400).json({
                message:"Invalid userId"
            })
        }
        if(!title || !userId){
            return res.status(400).json({
                success:false,
                message:"title and userid are required"
            })
        }
        const {user,error}=await fetchUserById(id)
        console.log(user)
        if(error){
            return res.status(404).json({
                message:"User not found"
            })
        }
        const todo=await createTodo({title,userId:id})
        return res.status(201).json({
            success:true,
            message:"todo created successfully",
            data:todo
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong"
        })
    }
}
export const getTodosByUserIdController=async(req:Request,res:Response)=>{
    try{
        const userId=Number(req.params.userId)
       
        if(isNaN(userId)){
            return res.status(400).json({
                message:"Invalid userId"
            })
        }
        const {user,error}=await fetchUserById(userId)
        if(error==="NOT_FOUND" || !user){
            return res.status(404).json({
                message:"User not Found"
            })
        }
        if(error==="UNAVAILABLE"){
            return res.status(503).json({
                message:"User-service is not avalibale"
            })
        }
        const todos=await getTodoByUser(userId)
        return res.status(200).json({
            success:true,
            message:"todos retrieved successfully",
            data:todos
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Somethig went wrong"
        })
    }
}
export const updateTodoController=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id
        const todoId=Number(id)
        if(isNaN(todoId)){
            return res.status(400).json({
                messasge:"Invalid todoId "
            })
        }
        const todo=await updateTodo(todoId,req.body)
        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"todo updated successfully",
            data:todo
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}
export const deleteTodoController=async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        const todoId=Number(id)
        if(isNaN(todoId)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid todo id" 
            });            
        }
        const deleted = await deleteTodo(todoId);
        if (!deleted) {
            return res.status(404).json({ 
                success: false, 
                message: "Todo not found" 
            });        
        }
        res.status(200).json({ 
            success: true, 
            message: "Todo deleted" 
        });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ 
            success: false, 
            message: "something went wrong" 
        });
    }
}