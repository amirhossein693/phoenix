import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import App from "../app";
import { calculateLocale } from "../modules/localization/check_locale";
import { changeLocale } from "../modules/localization/change_locale";
import { promises } from "../modules/get_configs";

const root = document.querySelector("#root");

// const localeCode = calculateLocale();

// const locale = createLocale({ localeCode });
// if (!isProduction) {
//   changeLocale({ locale });
// }
const phoenix = {
  version: 1,
  App: () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  env: {
    APP_NAME: process.env.APP_NAME,
    BASEPATH: process.env.BASEPATH,
    APP_API_BASE: process.env.APP_API_BASE,
    APP_TOKEN: process.env.APP_TOKEN,
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
    NODE_ENV: process.env.NODE_ENV
  }
};

console.log("start", phoenix.App);

const plugins = promises.map(promise => promise(phoenix));
plugins.map(plugin => plugin());

const renderMethod =
  process.env.NODE_ENV === "production" ? ReactDOM.hydrate : ReactDOM.render;

Loadable.preloadReady().then(() => {
  const { App } = phoenix;
  renderMethod(<App />, root);
});
