import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  it("should render headline", async () => {
    render(<App />);

    expect(await screen.findByText(/Tasker/i)).toBeInTheDocument();
  });

  it("should render task", async () => {
    render(<App />);

    screen.logTestingPlaygroundURL();
  });
});
