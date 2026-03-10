import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

describe("ProfileCard", () => {
  it("renders without crashing", () => {
    render(<ProfileCard />);
  });

  it("renders the user name", () => {
    render(<ProfileCard />);
    expect(screen.getByText("Ana García")).toBeInTheDocument();
  });

  it("renders the user email", () => {
    render(<ProfileCard />);
    expect(screen.getByText("ana@example.com")).toBeInTheDocument();
  });

  it("renders the role label", () => {
    render(<ProfileCard />);
    expect(screen.getByText(/rol:/i)).toBeInTheDocument();
  });

  it("renders a formatted price", () => {
    render(<ProfileCard />);
    expect(screen.getByText(/precio ejemplo/i)).toBeInTheDocument();
  });
});
