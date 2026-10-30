import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
interface TodoAttributes{
    id:number;
    title:string;
    completed:boolean;
    userId:number
}
type TodoCreationAttributes=Optional<TodoAttributes,"id" | "completed">

class Todo extends Model<TodoAttributes,TodoCreationAttributes> implements TodoAttributes{
    declare id:number;
    declare title:string;
    declare completed:boolean;
    declare userId:number;
}
Todo.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        completed:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }

    },{
        sequelize,
        timestamps:true,
        tableName:"todos",
        modelName:"Todo"
    }
)
export default Todo