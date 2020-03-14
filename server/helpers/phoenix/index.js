import React from "react";
import { StaticRouter } from "react-router-dom";
import setVars from "./set_vars";
import setPluginData from "./set_plugin_data";
import setWindowData from "./set_window_data";
import App from "../../../app";

const phoenix = () => (req, res, next) => {
  const { app } = req;
  app.set("phoenix", {
    version: 1,
    setVars: setVars(app),
    setPluginData: setPluginData(app),
    setWindowData: setWindowData(app),
    App: ({ location, context, ...rest }) => (
      <StaticRouter location={location} context={context}>
        <App {...rest} />
      </StaticRouter>
    ),
    env: {
      APP_NAME: process.env.APP_NAME,
      BASEPATH: process.env.BASEPATH,
      APP_API_BASE: process.env.APP_API_BASE,
      APP_TOKEN: process.env.APP_TOKEN,
      DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
      NODE_ENV: app.get("env")
    }
  });
  next();
};

export { setVars, setPluginData, setWindowData };
export default phoenix;
