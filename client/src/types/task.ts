export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  _id: string;
}

export type TaskStatus = "pending" | "in-progress" | "completed";
