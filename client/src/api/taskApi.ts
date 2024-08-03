import axios from "axios";
import { CreateTask } from "@/types/createTask";
import { Task, TaskStatus } from "@/types/task";

const BASE_URL = "http://localhost:3000/api/tasks";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchTasks(filter: string) {
  const url = `${BASE_URL}?${new URLSearchParams({ filter })}`;
  const { data } = await instance.get<Task[]>(url);

  return data;
}

export async function postTask(task: CreateTask) {
  const { data } = await instance.post<Task>(BASE_URL, task);

  return data;
}

export async function deleteTask(taskId: string) {
  const { data } = await instance.delete(`${BASE_URL}/${taskId}`);

  return data;
}

export async function updateTask({
  taskId,
  status,
}: {
  taskId: string;
  status: TaskStatus;
}) {
  const { data } = await instance.patch<Task>(`${BASE_URL}/${taskId}`, {
    status,
  });

  return data;
}
