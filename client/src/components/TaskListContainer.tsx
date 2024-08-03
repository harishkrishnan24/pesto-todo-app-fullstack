import { fetchTasks } from "@/api/taskApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorScreen from "./ErrorScreen";
import FilterTask from "./FilterTask";
import Loading from "./Loading";
import NoTasks from "./NoTasks";
import Task from "./Task";
import TaskInputFormModal from "./TaskInputFormModal";

function TaskListContainer() {
  const [filter, setFilter] = useState("all");
  const { data, isFetching, isError } = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => fetchTasks(filter),
  });

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="flex justify-end my-10 gap-x-5">
        <FilterTask
          filter={filter}
          onFilterChange={(value) => setFilter(value)}
        />
        <TaskInputFormModal />
      </div>
      <div className="flex flex-col gap-y-5">
        {data?.length ? (
          data?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <NoTasks />
        )}
      </div>
    </div>
  );
}

export default TaskListContainer;
