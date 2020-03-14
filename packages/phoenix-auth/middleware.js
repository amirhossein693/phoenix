import React from "react";
import createUser from "./src/create_user";
import CryptoJS from "crypto-js";
import serialize from "serialize-javascript";

const authPlugin = (options = {}) => (req, res, next) => {
  const { checkUser } = options;
  const { env, App, setVars, setPluginData, setWindowData } = req.app.get(
    "phoenix"
  );
  const token = req.cookies[env.APP_TOKEN];
  const theUser = createUser({
    env,
    token,
    checkUser
  });
  theUser.getUser().then(user => {
    setPluginData({ auth: { user } });

    setVars({
      App: () => (
        <App
          user={user && user.status === 200 && user.data}
          userContext={theUser && theUser}
        />
      )
    });

    if (token && user && user.data) {
      // Encrypt
      const userHash = CryptoJS.AES.encrypt(
        JSON.stringify({ user: user.data }),
        token
      ).toString();
      setWindowData({
        __CONTEXT__: serialize(userHash)
      });
    }

    next();
  });
};

export default authPlugin;
