import { useState, useEffect } from "react";

// Define the Pomodoro component
function Pomodoro() {
  // State variables to manage minutes, seconds, and display message
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);

  // Effect hook to handle timer logic
  useEffect(() => {
    // Set up an interval to decrement seconds every second
    let interval = setInterval(() => {
      // Clear the interval to prevent multiple intervals running simultaneously
      clearInterval(interval);

      // If seconds reach 0
      if (seconds === 0) {
        // If there are still minutes remaining
        if (minutes !== 0) {
          // Decrement minutes by 1 and set seconds to 59
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          // If the session is over, set minutes and seconds for the break
          let newMinutes = displayMessage ? 24 : 4;
          let newSeconds = 59;

          // Set the new values for minutes, seconds, and display message
          setSeconds(newSeconds);
          setMinutes(newMinutes);
          setDisplayMessage(!displayMessage);
        }
      } else {
        // Decrement seconds by 1
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]); // Re-run effect when seconds change

  // Format minutes and seconds with leading zeros if less than 10
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Render the Pomodoro component
  return (
    <div className="pomodoro">
      <div className="message">
        {/* Display break message if displayMessage is true */}
        {displayMessage && <div>Take a break! New session starts in: </div>}
      </div>
      {/* Display timer */}
      <center>{timerMinutes}:{timerSeconds}</center>
    </div>
  );
}


export default Pomodoro;