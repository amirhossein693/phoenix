import Cookies from "js-cookie";
import { createAPI } from "./src/create_api";

const promise = (options = {}) => phoenix => async () => {
  const { App, env } = phoenix;
  const token = Cookies.get(env.APP_TOKEN);
  const api = await createAPI({ token, env, options });
  return api;
};

export default promise;
