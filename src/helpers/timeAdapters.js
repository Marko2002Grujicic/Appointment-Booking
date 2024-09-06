const formatSecondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const generateTimeIntervals = (
  availability,
  dayIndex,
  returnSlots = false
) => {
  const timeIntervals = [];
  const slots = Object.values(availability)[dayIndex - 1];

  if (returnSlots) return slots;

  if (slots && Array.isArray(slots)) {
    slots.forEach((slot) => {
      let currentTimeInSeconds = slot.start;
      const endTimeInSeconds = slot.end;

      while (currentTimeInSeconds < endTimeInSeconds) {
        const start = formatSecondsToTime(currentTimeInSeconds);
        const nextTimeInSeconds = currentTimeInSeconds + 1800;
        const end = formatSecondsToTime(
          nextTimeInSeconds > endTimeInSeconds
            ? endTimeInSeconds
            : nextTimeInSeconds
        );

        timeIntervals.push({ start, end });
        currentTimeInSeconds = nextTimeInSeconds;
      }
    });
  } else {
    console.log("No slots available for this day.");
  }

  return timeIntervals;
};

export const transformSchedule = (schedule) => {
  return schedule.map(({ start, end }) => ({
    start: formatSecondsToTime(start),
    end: formatSecondsToTime(end),
  }));
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

export const findMaxEndTime = (schedule, selectedTime) => {
  const selectedTimeMinutes = timeToMinutes(selectedTime);
  const transformedSchedule = transformSchedule(schedule);

  const matchingTimeFrame = transformedSchedule.find((timeFrame) => {
    const startMinutes = timeToMinutes(timeFrame.start);
    const endMinutes = timeToMinutes(timeFrame.end);

    return (
      selectedTimeMinutes >= startMinutes && selectedTimeMinutes <= endMinutes
    );
  });

  if (matchingTimeFrame) {
    return matchingTimeFrame.end;
  }

  return null;
};

export const filteredTimeSlots = (
  schedule,
  formattedSchedule,
  selectedStartTime
) => {
  const maxTime = findMaxEndTime(schedule, selectedStartTime);
  const selectedStartTimeMinutes = timeToMinutes(selectedStartTime);

  return formattedSchedule.filter((slot) => {
    const startTimeMinutes = timeToMinutes(slot.start);
    const endTimeMinutes = timeToMinutes(slot.end);
    const maxEndTimeMinutes = timeToMinutes(maxTime);

    return (
      startTimeMinutes >= selectedStartTimeMinutes &&
      endTimeMinutes <= maxEndTimeMinutes
    );
  });
};
