require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

let API_KEY = process.env.API_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
};
