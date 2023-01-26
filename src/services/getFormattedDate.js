const getFormattedDate = (date) => {
  // фориатируем дату в человеческий вид
  return new Date(Date.parse(date)).toLocaleDateString("ru-RU", {
    dateStyle: "long",
  });
};
export default getFormattedDate;
