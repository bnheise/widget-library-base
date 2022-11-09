import { useState } from "react";

export const useThrottle = (callback: () => void, duration: number) => {
  const [throttlePause, setThrottlePause] = useState<boolean>(false);

  const throttle = () => {
    //don't run the function if throttlePause is true
    if (throttlePause) return;

    //set throttlePause to true after the if condition. This allows the function to be run once
    setThrottlePause(true);

    //setTimeout runs the callback within the specified time
    setTimeout(() => {
      callback();

      //throttlePause is set to false once the function has been called, allowing the throttle function to loop
      setThrottlePause(false);
    }, duration);
  };

  return throttle;
};
