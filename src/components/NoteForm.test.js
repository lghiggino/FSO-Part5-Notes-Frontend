import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

describe("<NoteForm />", () => {
  let container;
  let user;

  const createNote = jest.fn();

  beforeEach(() => {
    user = userEvent.setup();
    container = render(<NoteForm createNote={createNote} />).container;
  });

  it("should update the parent state and call onSubmit", async () => {
    const input = container.querySelector("form > input");

    // const input = screen.getByRole('textbox')
    // const inputs = screen.getAllByRole("textbox");
    // await user.type(inputs[0], "testing a form...");
    // const input = screen.getByPlaceholderText('write here note content')

    const sendButton = container.querySelector("button[type='submit']");

    await user.type(input, "Testing a form...");
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe("Testing a form...");
  });
});
