import Todo from "../models/todo.model";
interface CreateTodoInput{
    title:string;
    userId:number;
}
interface UpdateTodoInput{
    title?:string;
    completed?:boolean;
}

export async function createTodo(input: CreateTodoInput) {
  const todo=await Todo.create({ title: input.title, userId: input.userId });
  return todo
}
export async function getTodoByUser(userId:number){
    const todos=await Todo.findAll({
        where:{
            userId
        }
    })
}

export async function updateTodo(id: number, input: UpdateTodoInput) {
    const todo = await Todo.findByPk(id);
    if (!todo){
        return null
    }
    if (input.title !== undefined){
        todo.title = input.title;
    }
    if (input.completed !== undefined){
        todo.completed = input.completed;
    }
    await todo.save();
    return todo;
}
export async function deleteTodo(id: number) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
        return false;
    }
    await todo.destroy();
    return true;
}
