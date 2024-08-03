import createHttpError from "http-errors";
import TaskModel from "../models/taskModel.js";

const getTasks = async (filter) => {
  const filterQuery = filter ? { status: filter } : {};
  const tasks = await TaskModel.find(filterQuery);

  return tasks;
};

const createTask = async (task) => {
  const newTask = await TaskModel.create(task);
  if (!newTask) {
    throw createHttpError.InterServerError("Failed to create task");
  }
  return newTask;
};

const updateTaskStatus = async (taskId, status) => {
  const task = await TaskModel.findById(taskId);
  if (!task) {
    throw createHttpError.NotFound("Task not found");
  }
  task.status = status;

  const updatedTask = await task.save();
  return updatedTask;
};

const deleteTask = async (taskId) => {
  const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  if (!deletedTask) {
    throw createHttpError.NotFound("Task not found");
  }
  return deletedTask;
};

export const TaskService = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
