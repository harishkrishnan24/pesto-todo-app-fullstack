import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/tasks", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { id: "1", title: "Task 1", description: "Task 1 description" },
      { id: "2", title: "Task 2", description: "Task 2 description" },
    ]);
  }),
];
