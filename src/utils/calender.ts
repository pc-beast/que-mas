const extractDate = (text: string) => {
  const date = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/g);
  if (date) {
    return date[0];
  }
  return '';
};

const extractTime = (text: string) => {
  const time = text.match(/(\d{1,2}:\d{1,2})/g);
  if (time) {
    return time[0];
  }
  return '';
};   

const extractLink = (text: string) => {
  const link = text.match(/(https?:\/\/[^\s]+)/g);
  if (link) {
    return link[0];
  }
  return '';
};

const today = () => {
  const today = new Date().toLocaleDateString();
  const dateArr = today.split('/');
  return `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
}

const addToGoogleCalendar = (description: string) => {
  const calender_url = "https://calendar.google.com/calendar/r/eventedit";

  const title = "WhatsApp Event-" + new Date().toLocaleString();
  const date = extractDate(description) || today();
  const dateArr = date.split('/');
  const dateStr = dateArr[2] + dateArr[1] + dateArr[0];
  const time = extractTime(description);

  const timeArr = time.split(':');
  const timeStr = timeArr[0] + timeArr[1] + '00';
  const link = extractLink(description);
  const details = description;
  const url = `${calender_url}?text=${title}&dates=${dateStr}T${timeStr}Z/${dateStr}T${timeStr}Z&details=${details}&location=${link}`;
  window.open(url, "_blank");
}

export { addToGoogleCalendar };