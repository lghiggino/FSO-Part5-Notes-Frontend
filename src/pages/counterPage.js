import { useRef } from "react";
export default function LogButtonClicks() {
  const countRef = useRef(0);

  const handleIncrease = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`)
  };

  const handleDecrease = () => {
    countRef.current--;
    console.log(`Clicked ${countRef.current} times`)
  };

  console.log("I rendered!");
  return (
    <>
      <button onClick={handleIncrease}>Click me to add</button>;
      <button onClick={handleDecrease}>Click me to subtract</button>;
    </>
  );
}
