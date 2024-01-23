export function hmsToSeconds(timeString: string): number {
  // Initialize total seconds to 0
  let totalSeconds = 0

  // Split the input string by spaces to analyze each part
  const parts = timeString.split(" ")

  // Loop through each part of the split string
  for (let i = 0; i < parts.length; i++) {
    // Check if the current part is specifying hours
    if (parts[i] === "hour" || parts[i] === "hours") {
      // The previous part is the number of hours, convert it to seconds and add to total
      totalSeconds += parseInt(parts[i - 1]) * 3600 // 1 hour = 3600 seconds
    }
    // Check if the current part is specifying minutes
    else if (parts[i] === "min") {
      // The previous part is the number of minutes, convert it to seconds and add to total
      totalSeconds += parseInt(parts[i - 1]) * 60 // 1 minute = 60 seconds
    }
  }

  return totalSeconds
}

export function secondsToHMSLong(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let timeString = '';

  if (hours > 0) {
    timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes > 0) {
    if (timeString.length > 0) {
      timeString += ' ';
    }
    timeString += `${minutes} min`;
  }

  return timeString || '0 min'; // Return '0 min' if both hours and minutes are 0
}


export function secondsToHMS(seconds: number): string {
  // Calculate hours, minutes and seconds
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Pad the numbers to two digits with leading zeros if needed
  const paddedHours = hours.toString().padStart(2, "0")
  const paddedMinutes = minutes.toString().padStart(2, "0")
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0")

  // Concatenate the parts into a final string
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
}

export function convertDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Set time to the end of the day
  const endOfDayTime = "23:59:59";

  return `${formattedDate}T${endOfDayTime}`;
}

// Example usage
const originalDate = "Wed Jan 03 2024 00:00:00 GMT+0700 (Western Indonesia Time)";
const convertedDate = convertDate(originalDate);
console.log(convertedDate); // Output will be in the format "2024-01-03T00:00:00"

export function addOneDayAndFormat(dateString: string) {
  const date = new Date(dateString);

  // Add one day
  date.setDate(date.getDate() + 1);

  const formattedDate = date.toISOString().split('T')[0]; // Extracts the date part

  return `${formattedDate}T00:00:00`;
}
