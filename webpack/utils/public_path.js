const publicPath = env => env.BASEPATH !== "" ? `/${env.BASEPATH}/` : `/`;
module.exports = publicPath;