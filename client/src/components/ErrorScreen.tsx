import { Ban } from "lucide-react";

function ErrorScreen() {
  return (
    <div className="md:w-1/2 mx-auto flex flex-col justify-center items-center mt-40">
      <Ban className="h-10 w-10 text-red-500" />
      <p className="text-muted-foreground">
        Something went wrong. Try again later!
      </p>
    </div>
  );
}

export default ErrorScreen;
