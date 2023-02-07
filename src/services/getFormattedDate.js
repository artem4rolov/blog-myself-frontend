const getFormattedDate = (date) => {
  // отображаем все, что нам нужно
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // фориатируем дату в человеческий вид
  return new Date(Date.parse(date)).toLocaleDateString("ru-RU", options, {
    dateStyle: "long",
  });
};
export default getFormattedDate;
