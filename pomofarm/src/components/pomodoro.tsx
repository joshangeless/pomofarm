import React from "react";

// Define possible statuses for the Pomodoro timer
const STATUS = {
  pause: 0,
  start: 1,
  default: 2,
};

function Pomodoro() {
  // State variables for minutes, seconds, display message, and status of the timer
  const [minutes, setMinutes] = React.useState(1); // Initial minutes
  const [seconds, setSeconds] = React.useState(0); // Initial seconds
  const [displayMessage, setDisplayMessage] = React.useState(false); // Display break message
  const [status, setStatus] = React.useState(STATUS.default); // Initial status
  const intervalRef = React.useRef(); // Reference to the interval for countdown

  // Function to handle countdown logic
  function countDown() {
    if (seconds === 0) {
      if (minutes !== 0) {
        // Decrease minutes and set seconds to 59 when seconds reach 0
        setSeconds(59);
        setMinutes((min) => min - 1);
      } else {
        // Reset timer to default or break time and toggle break message
        let mins = displayMessage ? 24 : 4;
        let sec = 59;
        setSeconds(sec);
        setMinutes(mins);
        setDisplayMessage((value) => !value);
      }
    } else {
      // Decrease seconds
      setSeconds((sec) => sec - 1);
    }
  }

  // Effect hook to start, pause, or stop the timer based on status changes
  React.useEffect(() => {
    if (status === STATUS.start) {
      // Start countdown when status is 'start'
      intervalRef.current = setInterval(() => {
        countDown();
      }, 1000); // Run every second
    } else if (status === STATUS.pause && intervalRef.current) {
      // Pause countdown when status is 'pause'
      clearInterval(intervalRef.current);
    }
    // Cleanup function to clear interval when component unmounts or when status changes
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds, status]); // Run effect when minutes, seconds, or status change

  // Format minutes and seconds to ensure two-digit display
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Event handlers for start, pause, and restart timer buttons
  const start = () => setStatus(STATUS.start);
  const pause = () => setStatus(STATUS.pause);
  const stop = () => {
    // Stop timer and reset to initial values
    setStatus(STATUS.pause);
    setMinutes(1); // Reset minutes (testing on one minute)
    setSeconds(0); // Reset seconds
    setDisplayMessage(false); // Hide break message
  };

  // JSX for the Pomodoro timer component
  return (
    <div className="pomodoro">
      {displayMessage && ( // Display break message if enabled
        <div className="popup">
          <div>Take a break! New session starts in: </div>
        </div>
      )}
      <center>
        {timerMinutes}:{timerSeconds} {/* Display current time */}
      </center>
      <div className="button-container">
        <button className="startButton" onClick={start}>
          Start
        </button>
        <button className="pauseButton" onClick={pause}>
          Pause
        </button>
        <button className="restartButton" onClick={stop}>
          Restart Timer
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
