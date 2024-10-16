import { render, screen, cleanup } from "@testing-library/react";
import Todo from "../todo";

test("example", () => {
    render(<Todo/>);
    const todoElement = screen.getByTestId("test1");
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent("this is a test");
})