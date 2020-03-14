import fs from "fs";
import path from "path";
import React from "react";
import Loadable from "react-loadable";
import serialize from "serialize-javascript";
import ReactDOMServer from "react-dom/server";
import { getBundles } from "react-loadable-ssr-addon";
import stats from "../../dist/react-loadable.json";
import { middlewares } from "../../modules/get_configs";

const all = (req, res) => {
  const context = {};
  const modules = new Set();

  const indexFile = path.resolve("./dist/index.html");
  fs.readFile(indexFile, "utf8", (err, indexData) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    console.log(req.app.get("phoenix"));
    const { App, window } = req.app.get("phoenix");

    const app = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <App location={req.url} context={context} />
      </Loadable.Capture>
    );

    const modulesToBeLoaded = [...Array.from(modules)];

    const bundles = getBundles(stats, modulesToBeLoaded);

    let styles = "";
    (bundles.css || []).map(style => {
      // const href = style.publicPath.replace(REGEXP_LINK_HREF_DIR, `-${dir}`);
      styles += `<link href="${style.publicPath}" rel="stylesheet" />`;
    });

    let scripts = "";
    (bundles.js || []).map(script => {
      scripts += `<script src="${script.publicPath}"></script>`;
    });

    let inlineScripts = "";
    if (window) {
      let windowData = "";
      Object.keys(window).map(record => {
        windowData += `window.${record} = ${serialize(window[record])}`;
      });
      inlineScripts += `<script type="text/javascript">${windowData}</script>`;
    }

    const view = indexData
      .replace("</head>", `${styles}${scripts}</head>`)
      .replace(
        `<div id="root"></div>`,
        `<div id="root">${app}</div>${inlineScripts}`
      );

    res.send(view);
  });
};

export { middlewares };
export default all;
