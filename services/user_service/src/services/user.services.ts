import User from "../models/user.model";
import bcrypt from "bcrypt"
import { addWelcomeJobToQueue } from "../queues/email.queue";


interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserInput {
    name?: string;
    email?: string;
    password?: string;
}

export async function getUserByEmail(email: string) {
    return User.findOne({
        where: { email } 
    });
}

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(input.password, 12);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });
  try{
    await addWelcomeJobToQueue(input.email,input.name)
  }
  catch(err){
    console.log("can't add welcome to this email:",err)
  }
  
  return { id: user.id, name: user.name, email: user.email };
}

export async function getAllUsers() {
  return User.findAll({
    attributes: { exclude: ["password"] },
    order: [["id", "ASC"]],
  });
}
export async function getUserById(id: number) {
  return User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
}
export async function updateUser(id: number, input: UpdateUserInput) {
  const user = await User.findByPk(id);
  if (!user){
    return null;
  }
  if (input.name !== undefined) user.name = input.name;
  if (input.email !== undefined) user.email = input.email;
  if (input.password !== undefined) user.password = await bcrypt.hash(input.password, 12);

  await user.save();
  return { id: user.id, name: user.name, email: user.email };
}
export async function deleteUser(id: number) {
  const user = await User.findByPk(id);
  if (!user){
    return false
  }
  await user.destroy();
  return true;
}

