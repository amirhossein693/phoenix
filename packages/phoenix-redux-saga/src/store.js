import createSagaMiddleware, { END } from "redux-saga";
import {
  applyMiddleware,
  createStore as createReduxStore,
  compose
} from "redux";

const createStore = ({ initState = {}, env, rootReducer } = {}) => {
  const composeEnhancers =
    (env.NODE_ENV !== "production" &&
      typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default createStore;
