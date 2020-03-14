import createStore from "./src/store";
import withReduxSaga from "./src/with_redux_saga";

const promise = (options = {}) => phoenix => async () => {
  const { App } = phoenix;
  const { rootSaga, rootReducer } = options;
  const store = await createStore({
    env: process.env,
    rootReducer,
    initState: window.__SERVER_STATES__ || {}
  });
  store.runSaga(rootSaga);
  phoenix.App = withReduxSaga(App, store);
  return { store };
};

export default promise;
