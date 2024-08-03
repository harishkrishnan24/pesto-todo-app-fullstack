import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/taskApi";
import { toast } from "sonner";

interface DeleteTaskButtonProps {
  readonly taskId: string;
}

function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
  });

  function handleDeleteTask(taskId: string) {
    mutate(taskId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task deleted successfully");
      },
      onError: (_error) => {
        toast.error("Error deleting task");
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="text-red-500 hover:text-red-800" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTask(taskId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTaskButton;
