import { useRef } from "react";
export default function LogButtonClicks() {
  const countRef = useRef(0);

  const handleIncrease = () => {
    countRef.current++;
    console.log(`Count now is: ${countRef.current}`);
  };

  const handleDecrease = () => {
    countRef.current--;
    console.log(`Count now is: ${countRef.current}`);
  };

  return (
    <>
      <button onClick={handleIncrease}>Click me to add</button>
      <button onClick={handleDecrease}>Click me to subtract</button>
    </>
  );
}
