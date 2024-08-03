import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "./components/Header";
import TaskListContainer from "./components/TaskListContainer";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="body-gray-100 h-screen container mx-auto my-10">
        <Header />
        <TaskListContainer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
