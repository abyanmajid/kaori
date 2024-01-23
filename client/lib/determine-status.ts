export function determineStatus(deadline: string) {
  // Parse the deadline and get the current date/time
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();

  // Compare the dates
  let status;
  if (deadlineDate < currentDate) {
    // Deadline is in the past
    status = "overdue";
  } else {
    // Deadline is in the future
    status = "pending";
  }

  return status;
}
