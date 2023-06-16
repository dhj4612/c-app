import { useState } from "react";

export const useConuntDown = ({
                                count = 60,
                                delay = 1000,
                                render = (value) => `${value}`,
                                callback = () => {
                                },
                              }) => {
  const [renderValue, setRenderValue] = useState(render(count));
  let [intervalId, setIntervalId] = useState(undefined);
  let [countDown, setCountDown] = useState(count);
  let resetMark = false;
  const clear = () => {
    clearInterval(intervalId);
    setIntervalId(undefined);
  };
  const start = () => {
    if (intervalId && !resetMark) {
      return;
    }
    resetMark = false;
    setRenderValue(render(countDown));
    setIntervalId(setInterval(() => {
      if (countDown === 0) {
        clearInterval(intervalId);
        intervalId = undefined;
        callback();
      } else {
        countDown--;
      }
      setRenderValue(render(countDown));
      setCountDown(countDown);
    }, delay));
  };
  const stop = () => {
    clear();
    console.log(countDown);
  };

  const restart = () => {
    clear();
    resetMark = true;
    countDown = count;
    setRenderValue(render(countDown));
    start();
  };
  const isEnd = () => {
    return countDown === 0;
  };

  return {
    start, isEnd, restart, stop, renderValue, setRenderValue,
  };
};
