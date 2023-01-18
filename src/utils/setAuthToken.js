import axios from "axios";

const setAuthToken = (token) => {
  // если токен есть - добавляем его в заголовки при любом запросе
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // если нет - поле "Authorization" в заголовках будет пустым, соответственно нельзя добавлять, удалять и править посты
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
