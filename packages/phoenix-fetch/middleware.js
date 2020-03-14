import { createAPI } from "./src/create_api";

const fetchPlugin = (options = {}) => (req, res, next) => {
  const { env } = req.app.get("phoenix");
  const token = req.cookies[env.APP_TOKEN];
  createAPI({ token, env, options });
  next();
};

export default fetchPlugin;
