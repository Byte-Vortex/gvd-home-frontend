import { useEffect } from "react";
import { useState } from "react";

/**
 *
 * @description
 * This must be used in client components only! and will for sure cause hydration error,
 * due to time difference between the server and the client. So better use it for client components only.
 */
export default function useIsTempleOpen() {
  const openTimes = [
    {
      start: {
        hours: 4,
        hoursString: "4",
        minutes: 30,
        minutesString: "30",
      },
      end: {
        hours: 13,
        hoursString: "13",
        minutes: 0,
        minutesString: "00",
      },
    },

    {
      start: {
        hours: 16,
        hoursString: "16",
        minutes: 30,
        minutesString: "30",
      },
      end: {
        hours: 20,
        hoursString: "20",
        minutes: 45,
        minutesString: "45",
      },
    },
  ];

  const closedTimes = [
    {
      start: {
        hours: 13,
        hoursString: "13",
        minutes: 0,
        minutesString: "00",
      },
      end: {
        hours: 16,
        hoursString: "16",
        minutes: 30,
        minutesString: "30",
      },
    },

    {
      start: {
        hours: 20,
        hoursString: "20",
        minutes: 45,
        minutesString: "45",
      },
      end: {
        hours: 4,
        hoursString: "4",
        minutes: 4,
        minutesString: "30",
      },
    },
  ];

  const [isTempleOpen, setIsTempleOpen] = useState(
    () => checkTime(openTimes, closedTimes).isOpen
  );
  const [timeRange, setTimeRange] = useState(
    () => checkTime(openTimes, closedTimes).timeRange
  );
  const [closedTimeRange, setClosedTimeRange] = useState(
    () => checkTime(openTimes, closedTimes).closedTimeRange
  );

  function checkTime(openTimes, closedTimes) {
    let now = new Date(); //current_date
    const nowIst = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    let hours = nowIst.getHours();
    let mins = nowIst.getMinutes();

    let isOpen = false;

    let timeRange = false;
    let closedTimeRange = false;

    for (let time of openTimes) {
      if (time.start.hours > hours || hours > time.end.hours) continue;

      if (time.start.hours === hours && mins < time.start.minutes) continue;

      if (time.end.hours === hours && mins > time.end.minutes) continue;

      isOpen = true;
      timeRange = time;
      break;
    }

    if (!isOpen) {
      for (let time of closedTimes) {
        if (time.start.hours <= hours && hours <= time.end.hours) {
            closedTimeRange = time;
            break;
          } else if (time.start.hours > time.end.hours) { // time range spans across midnight
            if (hours >= time.start.hours || hours <= time.end.hours) {
              closedTimeRange = time;
              break;
            }
          }
      }
    }

    return {
      isOpen,
      timeRange,
      closedTimeRange,
    };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { isOpen, timeRange, closedTimeRange } = checkTime(
        openTimes,
        closedTimes
      );
      setIsTempleOpen(isOpen);
      setTimeRange(timeRange);
      setClosedTimeRange(closedTimeRange);
    }, 1000);

    return () => clearInterval(intervalId);
    //eslint-disable-next-line
  }, []);

  return {
    isTempleOpen,
    timeRange,
    closedTimeRange,
  };
}