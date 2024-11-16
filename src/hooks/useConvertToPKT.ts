import { useState, useEffect } from 'react';

function useConvertToPKT(utcTimestamp: string) {
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        if (utcTimestamp) {
            // Convert the UTC timestamp to a Date object
            const utcDate = new Date(utcTimestamp);

            // Convert the Date object to PKT (UTC + 5 hours)
            // const options = { timeZone: 'Asia/Karachi', hour12: true };

            // Format the year, month, date
            const year = utcDate.toLocaleString('en-GB', { timeZone: 'Asia/Karachi', year: 'numeric' });
            const month = utcDate.toLocaleString('en-GB', { timeZone: 'Asia/Karachi', month: 'long' }); // Full month name
            const date = utcDate.toLocaleString('en-GB', { timeZone: 'Asia/Karachi', day: '2-digit' });

            // Format the time part to "hh:mm AM/PM"
            const time = utcDate.toLocaleTimeString('en-GB', {
                timeZone: 'Asia/Karachi',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
            });

            // Set the state variables
            setYear(year);
            setMonth(month);
            setDate(date);
            setTime(time);
        }
    }, [utcTimestamp]);

    return { year, month, date, time };
}

export default useConvertToPKT;
