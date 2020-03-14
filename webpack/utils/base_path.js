const basePath = env => env.BASEPATH !== "" ? `/${env.BASEPATH}/assets` : `/assets`;
module.exports = basePath;