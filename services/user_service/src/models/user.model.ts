import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/database";
interface UserAttributes{
    id:number;
    name:string;
    email:string;
    password:string;
    
    
}
type UserCreationAttributes=Optional<UserAttributes,"id">
class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    declare id:number;
    declare name:string;
    declare email:string;
    declare password:string;
    
    
}
User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
        
    },{
        sequelize,
        timestamps:true,
        tableName:"users",
        modelName:"User"
        
    }
)
export default User
   