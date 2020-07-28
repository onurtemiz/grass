require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let EMAIL_PASS = process.env.EMAIL_PASS;
let API_KEY = process.env.API_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  EMAIL_PASS,
  API_KEY,
};
