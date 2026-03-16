import { useState, useEffect } from "react";

export function useTime() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const city = "Phnom Penh";
    const countryCod = "KH";
    return (
        <div>
            <p>{formatter.format(time)} - {city}, {countryCod}</p>
        </div>
    );
}            