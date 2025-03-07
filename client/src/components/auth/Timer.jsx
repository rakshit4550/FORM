import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

const Timer = ({ time, setisexpiry }) => {
  const targetTime =useMemo(()=>Date.now()+time,[time])
  
  return (
    <div className="timer">
        <Countdown
        onComplete={() => setisexpiry(true)}
        date={targetTime}
      ></Countdown>
    </div>
  );
};

export default Timer;
