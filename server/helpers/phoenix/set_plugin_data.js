const setPluginData = app => data => {
  const phoenix = app.get("phoenix");
  phoenix.setVars({
    plugins: {
      ...phoenix.plugins,
      ...data
    }
  });
};

export default setPluginData;
