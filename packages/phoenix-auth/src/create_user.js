import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const createUser = ({ initContext, token, checkUser, env }) => {
  return {
    getToken({ callback } = {}) {
      let theToken = Cookies.get(env.APP_TOKEN);
      let appToken = null;
      if (typeof window === "object" && typeof theToken === "string") {
        appToken = theToken;
      } else if (typeof token === "string") {
        appToken = token;
      }
      if (callback && typeof callback === "function") {
        callback();
      }
      return appToken;
    },
    setToken({ token, callback } = {}) {
      if (typeof window === "object") {
        Cookies.set(env.APP_TOKEN, token, { expires: 7 });
      }
      if (callback && typeof callback === "function") {
        callback();
      }
    },
    removeToken() {
      Cookies.remove(env.APP_TOKEN);
    },
    getUser() {
      if (initContext) {
        // Decrypt
        const token = this.getToken();
        const bytes = CryptoJS.AES.decrypt(initContext, token);
        const string = bytes.toString(CryptoJS.enc.Utf8);
        if (string) {
          const context = JSON.parse(string);
          if (context && "user" in context) {
            return Promise.resolve({ data: context.user });
          } else {
            this.removeToken();
            return Promise.resolve({});
          }
        }
      } else if (
        !initContext &&
        this.getToken() &&
        checkUser &&
        typeof checkUser === "function"
      ) {
        return checkUser();
      } else {
        this.removeToken();
        return Promise.resolve({});
      }
    }
  };
};

export default createUser;
