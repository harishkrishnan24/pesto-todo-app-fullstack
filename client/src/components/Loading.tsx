import { Skeleton } from "./ui/skeleton";

function Loading() {
  return (
    <div className="md:w-1/2 mx-auto">
      <div className="flex justify-end my-10 gap-x-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-y-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

export default Loading;
