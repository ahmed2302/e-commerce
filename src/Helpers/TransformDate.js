export default function TrasformDate(date) {
  const selectedDate = new window.Date(date);
  const getFullYear = selectedDate.getFullYear();
  const getMonth = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const getDay = selectedDate.getDate().toString().padStart(2, "0");

  return `${getFullYear}-${getMonth}-${getDay}`;
}
