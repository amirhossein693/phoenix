import React from "react";
import { Provider } from "react-redux";
import createStore from "./src/store";
import { matchRoutes } from "react-router-config";

const reduxSagaPlugin = (options = {}) => (req, res, next) => {
  const { App, env, setPluginData, setWindowData, setVars } = req.app.get(
    "phoenix"
  );
  const { routes, rootSaga, rootReducer } = options;
  const location = req.originalUrl;
  const store = createStore({ env, rootReducer });
  store
    .runSaga(rootSaga)
    .toPromise()
    .then(
      new Promise((resolve, reject) => {
        const currentRoute = matchRoutes(routes, location);
        const need = currentRoute.map(({ route, match }) => {
          // check if the component exists and have the `pre-fetch` method
          if (route.component) {
            return route.component &&
              route.component &&
              route.component.fetchData
              ? route.component.fetchData({
                  // pass store and location parameters data to `pre-fetch` method
                  store,
                  params: match.params
                })
              : [];
          }
          return [];
        });
        store.close();
        resolve(need);
      })
    )
    .then(() => {
      const __SERVER_STATES__ = store.getState();
      setPluginData({
        reduxSaga: {
          store
        }
      });
      setWindowData({
        __SERVER_STATES__
      });
      setVars({
        App: () => (
          <Provider store={store}>
            <App />
          </Provider>
        )
      });
      next();
    })
    .catch(next);
};

export default reduxSagaPlugin;
