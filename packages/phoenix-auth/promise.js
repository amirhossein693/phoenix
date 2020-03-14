import createUser from "./src/create_user";
import Cookies from "js-cookie";
import withUser from "./src/with_user";

const promise = (options = {}) => phoenix => async () => {
  let theUser;
  const { checkUser } = options;
  const { App, env } = phoenix;
  const token = Cookies.get(env.APP_TOKEN);
  if (env.NODE_ENV === "production") {
    // in production we have SSR
    theUser = createUser({
      env,
      initContext: window.__CONTEXT__ || null
    });
  } else {
    theUser = createUser({
      env,
      token,
      checkUser
    });
  }
  const user = await theUser.getUser().then(user => {
    phoenix.App = withUser(App, { user, theUser });
    return user;
  });
  return { user };
};

export default promise;
