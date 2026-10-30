import { createUser,getAllUsers,getUserByEmail,getUserById,updateUser,deleteUser } from "../services/user.services";
import { Request,Response } from "express";

export const createUserController=async(req:Request,res:Response)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            res.status(400).json({
                success:false,
                message:"name,email, and password are required",
            })
            return
        }
        const existingUser=await getUserByEmail(email)
        if(existingUser){
            res.status(409).json({
                success:false,
                message:"email already registered"
            })
            return
        }
        const user=await createUser({name,email,password})
        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:user
        })
        return
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
export const getAllUsersController=async(req:Request,res:Response)=>{
    try{
        const users=await getAllUsers();
        res.status(200).json({
            success:true,
            message:"Users retrived successfully",
            data:users
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })        
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = await getUserById(Number(id));
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
        return;
    }

    res.status(200).json({ 
        success: true, 
        data: user 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ 
        success: false, 
        message: "something went wrong" 
    });
  }
};
export const updateUserController=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id
        const {email}=req.body.email
        if(email){
            const emailOwner=await getUserByEmail(email)
            if(emailOwner){
                res.status(409).json({
                    success:false,
                    message:"email already registered"
                    
                })
                return
            }
        }
        const user=await updateUser(Number(id),req.body);
        if(!user){
            res.status(404).json({
                message:"user not found"
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:user
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id 
    
    const deleted = await deleteUser(Number(id));
    if (!deleted) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ 
        success: true, 
        message: "User deleted" 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ 
        success: false, 
        message: "something went wrong" 
    });
  }
};