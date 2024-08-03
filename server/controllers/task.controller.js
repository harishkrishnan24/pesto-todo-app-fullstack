import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import { TaskService } from "../services/task.service.js";
import { TaskStatus } from "../constants/taskStatus.js";

const getTasks = async (req, res, next) => {
  const filter = Object.values(TaskStatus).includes(req.query.filter)
    ? req.query.filter
    : null;
  try {
    const tasks = await TaskService.getTasks(filter);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError.BadRequest(errors.array()));
  }
  try {
    const tasks = await TaskService.createTask(req.body);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError.BadRequest(errors.array()));
  }
  try {
    const tasks = await TaskService.updateTaskStatus(
      req.params.id,
      req.body.status
    );
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const tasks = await TaskService.deleteTask(req.params.id);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const TaskController = {
  getTasks,
  postTask,
  updateTaskStatus,
  deleteTask,
};
