import React from "react";
import { Provider } from "react-redux";

const withReduxSaga = (Component, store) => {
  return props => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export default withReduxSaga;
