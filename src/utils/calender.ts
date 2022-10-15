const addToGoogleCalendar = (description: string) => {
  const calender_url = "https://calendar.google.com/calendar/r/eventedit";
  const title = "WhatsApp Event-" + new Date().toLocaleString();
  const details = description;
  const url = `${calender_url}?text=${title}&details=${details}`;
  window.open(url, "_blank");
}

export { addToGoogleCalendar };