function formatTime(dateInput) {
  const date = new Date(dateInput);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export { formatTime };
