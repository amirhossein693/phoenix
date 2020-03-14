const setWindowData = app => data => {
  const phoenix = app.get("phoenix");
  phoenix.setVars({
    window: {
      ...phoenix.window,
      ...data
    }
  });
};

export default setWindowData;
