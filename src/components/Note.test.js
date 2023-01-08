import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

describe("Basic Tests ", () => {
  it("Renders content - get content via screen and getByText", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: false,
    };

    render(<Note note={note} />);

    // screen.debug();

    const element = screen.getByText(
      "Component testing is done with react-testing-library"
    );

    // screen.debug(element);

    expect(element).toBeDefined();
  });

  it("Renders content - get content via { container } and query selector", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const { container } = render(<Note note={note} />);

    const div = container.querySelector(".note");
    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );

    const button = container.querySelector(".note > button");
    expect(button).toHaveTextContent("make not important");
  });

  it("clicking the button calss event handler once", async () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const mockHandler = jest.fn();

    const { container } = render(
      <Note note={note} toggleImportance={mockHandler} />
    );

    const user = userEvent.setup();
    const button = container.querySelector(".note > button");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
