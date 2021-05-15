import React, { useState, useEffect } from "react";
import { container, timer } from "./AuthTimer.module.scss";

const initialTime = 300;

export default function AuthTimer(props) {
  const [countdown, setCountdown] = useState(initialTime);
  const [resetCount, setResetCount] = useState(props.resetCount);

  useEffect(() => {
    let timeout;
    if (resetCount !== props.resetCount) {
      setResetCount(props.resetCount);
      setCountdown(initialTime);
    } else {
      timeout = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          props.onTimerEnd();
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [countdown, resetCount]);

  const toTimerFormat = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  };

  return (
    <div className={container}>
      {"Code expiring in "}
      <span className={timer}>{toTimerFormat(countdown)}</span>
    </div>
  );
}
