import { useEffect, useState } from "react";

function Clock() {
    // State variable to hold the current time
    const [currentTime, setCurrentTime] = useState("Current Time");

    useEffect(() => {
        // This effect runs after every render

        // Get the current date and time
        const currentDate = new Date();

        // Set up an interval to update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(currentDate.toLocaleTimeString());
        }, 1000);

        // Clean-up function to clear the interval when the component unmounts or the currentTime state changes
        return () => {
            clearInterval(interval);
        };

    }, [currentTime]);

    // Display the current time
    return (
        <div className="center">{currentTime}</div>
    );
}

export default Clock;
