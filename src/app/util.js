function formatDateMonthDayYear(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day} ${year}`;
}

export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const intervals = [
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  // Current Date - Date Params to get difference in seconds.
  const dateDiffInSeccond = Math.floor((new Date() - date) / 1000);

  // If date is longer than week we return the formatted date instead of relative time.
  if (dateDiffInSeccond > 604800) {
    return formatDateMonthDayYear(date);
  }

  // If not we find the closest interval and use that.
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];

    // Compute Interval Count (Number of Week, Days, Etc.)
    const intervalCount = Math.floor(dateDiffInSeccond / interval.seconds);

    // if intervalCount is not a fraction we found a suitable interval.
    if (intervalCount >= 1) {
      const plural = intervalCount !== 1 ? "s" : "";
      return `${intervalCount} ${interval.label}${plural} ago`;
    }
  }

  return "Just now";
};

export const formatCurrency = (num) => {
  let numberToFormat = num.toString();
  let result = "";
  let count = 0;

  // Parse in reverse. Each 3 digit we add comma.
  for (let i = numberToFormat.length - 1; i >= 0; i--) {
    if (count === 3) {
      result = "," + result;
      count = 0;
    }
    result = numberToFormat[i] + result;
    count++;
  }

  return "$" + result;
};
