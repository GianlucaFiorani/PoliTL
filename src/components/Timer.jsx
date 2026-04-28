import { useEffect, useState } from "react";

const Timer = ({ saveStart, setStartTime, finishTime }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let startTime = saveStart;
    if (!startTime) {
      startTime = Date.now();
      setStartTime(startTime);
    }
    if (finishTime) {
      const elapsed = Math.floor((finishTime - startTime) / 1000);
      setSeconds(elapsed);
      return;
    }
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [finishTime]);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
};
export default Timer;
