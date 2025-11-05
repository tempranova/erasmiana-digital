export const formatDate = (day, month, year) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (!year) return ""; // no valid date at all

  if (month && day) {
    return `${months[month - 1]} ${day}, ${year}`;
  } else if (month) {
    return `${months[month - 1]} ${year}`;
  } else {
    return `${year}`;
  }
}