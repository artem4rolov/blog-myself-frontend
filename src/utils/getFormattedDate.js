const getFormattedDate = (date) => {
  // фориатируем дату в человеческий вид
  return new Date(Date.parse(date)).toLocaleDateString("en-US", {
    dateStyle: "long",
  });
};
export default getFormattedDate;
