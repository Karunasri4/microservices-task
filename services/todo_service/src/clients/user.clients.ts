import dotenv from "dotenv"
import axios from "axios"
import type { AxiosInstance } from "axios"
type RemoteUser={
    id:number;
    name:string;
    email:string;
}
type fetchUserResult={
    user?:RemoteUser;
    error?:"NOT_FOUND" | "UNAVAILABLE"
}

const api:AxiosInstance=axios.create({
    baseURL:process.env.BASE_URL,
    timeout:3000
})
export const fetchUserById=async(userId:number):Promise<fetchUserResult>=>{
    try{
        const response=await api.get(`users/${userId}`)
        console.log(response.data.data);
        return {user:response?.data?.data as RemoteUser}
    }
    catch(err){
        if(axios.isAxiosError(err) && err.response?.status===404 ){
            return {error:"NOT_FOUND"}
        }
        return {error:"UNAVAILABLE"}
    }
}
