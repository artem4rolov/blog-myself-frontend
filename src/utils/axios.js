import axios from "axios";

axios.interceptors.request.use(async (config) => {
  const token = await getToken();
  return {
    ...config,
    headers: { ...config.headers, Authorization: token },
  };
});
