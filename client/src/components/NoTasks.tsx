import { ListChecks } from "lucide-react";

function NoTasks() {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <ListChecks className="h-20 w-20 text-blue-500 animate-bounce" />
      <p className="text-muted-foreground">No Tasks found!</p>
    </div>
  );
}

export default NoTasks;
