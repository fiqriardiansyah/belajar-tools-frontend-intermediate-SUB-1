import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "../lib/utils";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://story-api.dicoding.dev/v1";

axiosClient.defaults.timeout = 1000000;

axiosClient.defaults.validateStatus = () => true;

axiosClient.interceptors.request.use((req) => {
  const token = Cookies.get(TOKEN);
  if (token) {
    req.headers = {
      ...req?.headers,
      Authorization: "Bearer " + Cookies.get(TOKEN),
    };
  }
  return req;
});

export default axiosClient;
