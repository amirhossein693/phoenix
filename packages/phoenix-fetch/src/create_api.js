import fetch from "isomorphic-fetch";

const methods = ["post", "get", "put", "delete", "update", "patch"];
const api = {};

const APICreator = ({ method, token, env, options }) => {
  return (endpoint, body) => {
    const { customHeaders } = options;
    const isAbsolute = endpoint.toLowerCase().startsWith("http");
    const url = isAbsolute ? endpoint : `${env.APP_API_BASE}${endpoint}`;
    const headerOptions = {
      method: method.toUpperCase(),
      body: JSON.stringify(body),
      headers: customHeaders
    };

    if (token && typeof token === "string") {
      headerOptions.headers["Authorization"] = token;
    }

    return fetch(url, headerOptions)
      .then(response => {
        return response.json().then(data => {
          return {
            status: response.status,
            statusText: response.statusText,
            data
          };
        });
      })
      .catch(error => error);
  };
};

const createAPI = ({ token, env, options } = {}) => {
  for (let index in methods) {
    const method = methods[index];
    api[method] = APICreator({ method, token, env, options });
  }
  return api;
};

// create API wrapper in app init
createAPI();

// we might need to recreate API after user has logged in
// or after setting custom header or some other changes in API structure
export { createAPI };

export default api;
