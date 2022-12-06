import { useRef } from "react";

export default function TestPage() {
  const textInput = useRef();

  function handleClick() {
    textInput.current.focus();
  }

  function handleKeyPress() {
    console.log(textInput)
  }

  function logInputResult() {
    console.log(textInput.current.value);
  }

  return (
    <div>
      <input type="text" ref={textInput} onKeyUp={handleKeyPress} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
      <button onClick={logInputResult}>Log Input result</button>
    </div>
  );
}
