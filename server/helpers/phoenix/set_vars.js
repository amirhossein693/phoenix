const setVars = app => data => {
  const phoenix = app.get("phoenix");
  app.set("phoenix", {
    ...phoenix,
    ...data
  });
};

export default setVars;
