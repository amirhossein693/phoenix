import middleware from "./middleware";
import effects from "./effects";
import promise from "./promise";

const plugin = options => {
  return {
    middleware: middleware(options),
    promise: promise(options)
  };
};

export { effects };
export default plugin;
