// Code to read and set any environment variables
require("dotenv").config();

const keys = require('./keys');
// var spotify = new Spotify(keys.spotify);
console.log(keys.sportify.id);
console.log(keys.sportify.secret);
