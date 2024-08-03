import { updateTask } from "@/api/taskApi";
import { cn } from "@/lib/utils";
import { TaskStatus, Task as TaskType } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, CircleMinus, CookingPot } from "lucide-react";
import { toast } from "sonner";
import DeleteTaskButton from "./DeleteTaskButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TaskProps {
  readonly task: TaskType;
}

function Task({ task }: TaskProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
  });

  function handleUpdateTask(taskId: string, status: TaskStatus) {
    mutate(
      { taskId, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("Task Status updated successfully");
        },
        onError: (_error) => {
          toast.error("Error updating task status");
        },
      }
    );
  }

  return (
    <div
      className={cn(
        "border bg-slate-200 p-4 rounded-md hover:bg-slate-300 cursor-pointer flex justify-between items-center drop-shadow-sm",
        task.status === "completed" && "border-r-green-500 border-r-4",
        task.status === "in-progress" && "border-r-blue-500 border-r-4",
        task.status === "pending" && "border-r-gray-500 border-r-4"
      )}
      key={task._id}
    >
      <div>
        <h1 className={cn(task.status === "completed" && "line-through")}>
          {task.title}
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-xs",
            task.status === "completed" && "line-through"
          )}
        >
          {task?.description}
        </p>
      </div>
      <div className="flex gap-x-6">
        <TooltipProvider>
          {task.status !== "in-progress" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CookingPot
                  className="text-blue-500 hover:text-blue-800"
                  onClick={() => handleUpdateTask(task._id, "in-progress")}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Set Task to In Progress</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              {task.status === "completed" ? (
                <CircleMinus
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => handleUpdateTask(task._id, "pending")}
                />
              ) : (
                <CircleCheckBig
                  className="text-green-600 hover:text-green-800"
                  onClick={() => handleUpdateTask(task._id, "completed")}
                />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {task.status === "completed"
                  ? "Set Task to To Do"
                  : "Set Task to completed"}
              </p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <DeleteTaskButton taskId={task._id} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove Task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Task;
