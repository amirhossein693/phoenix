const path = require('path');
const fs = require('fs');
const isProduction = process.env.NODE_ENV === 'production';
const dotenvPath = isProduction ?
    path.resolve(__dirname, '../../code/.env') :
    path.resolve(__dirname, '../../code/.env.development');

try {
  if (fs.existsSync(dotenvPath)) {
    console.log(`${isProduction ? '.env' : '.env.development'} loaded`)
  } else {
    console.error('');
    console.error(`${isProduction ? '.env' : '.env.development'} does not exist`);
    console.error(`Please make a copy from .env.default and set the correct data`);
    console.error('');
    process.exit(1);
  }
} catch(err) {
  console.error(err);
  process.exit(1);
}

const dotenv = require('dotenv');
const env = dotenv.config({
  path: dotenvPath
}).parsed;

module.exports = { env, dotenvPath, isProduction };