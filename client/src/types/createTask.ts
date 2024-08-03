import { Task } from "./task";

export type CreateTask = Omit<Task, "_id">;
