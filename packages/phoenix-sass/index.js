import webpack from "./webpack";

const plugin = options => {
  return {
    webpack: webpack(options)
  };
};

export { webpack };
export default plugin;
