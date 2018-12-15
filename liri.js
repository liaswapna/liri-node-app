// inputs
// concert-this Ariana Grande Metallica
// spotify-this-song this-love
// movie-this frozen
// do-what-it-says


// Code to read and set any environment variables
require("dotenv").config();

// modules
const keys = require('./keys'),
      Spotify = require('node-spotify-api'),
      moment = require('moment'),
      request = require('request'),
      fs = require('fs'),
      BAND_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss',
      DEFAULT_BAND = 'Ariana Grande'
      DEFAULT_MOVIE = 'Mr. Nobody',
      DEFAULT_SONG = 'The Sign by Ace of Base';
      OMDB_APIKEY = keys.omdb.id;
      BAND_APIKEY = keys.band.id;

// Variables
var spotify = new Spotify(keys.spotify);

// Get the input
const argCommand = process.argv[2],
      argSearch = process.argv.slice(3).join(" ");

runCommand(argCommand,argSearch);

function runCommand(command,search){
  switch(command){
    case 'concert-this':
                  getBandEvents(search || DEFAULT_BAND)
                  break;
    case 'spotify-this-song':
                  getSpotifySongs(search || DEFAULT_SONG)
                  break;
    case 'movie-this':
                  getOmdbMovies(search || DEFAULT_MOVIE)
                  break;
    case 'do-what-it-says':
                  getFromFile()
                  break;
    default:
          console.log("Liri doesn't know that.");
          break;
  }
}

// If the command is 'concert-this'
function getBandEvents(argSearch){
  request(`https://rest.bandsintown.com/artists/${argSearch}/events?app_id=${BAND_APIKEY}`, function (error, response,body) {
    
    var data = JSON.parse(body);
    // Print the error if one occurred
    if (error) {
      return console.log('Error occurred: ' + error);
    } 
    else if (!error && response.statusCode === 200 && data.length >= 1){
      var fileData = `\r\nCOMMAND: concert-this SEARCH: ${argSearch}\n`;
      console.log(`PROCESSING ${argCommand}.....`);
      console.log('\n');

      for(var i=0;i<data.length;i++){
        var location = `${data[i].venue.city}, ${data[i].venue.region}, ${data[i].venue.country}`;
        var time = moment(data[i].datetime,BAND_DATE_FORMAT).format('MM/DD/YYYY');
        console.log(`Venue: ${data[i].venue.name}`);
        console.log(`Location: ${location}`);
        console.log(`Date: ${time}`);
        console.log("\r\n------------------------------------------------\r\n");
        fileData = fileData + `Venue: ${data[i].venue.name}\nLocation: ${location}\nDate: ${time}\n--------------------------------\n`;
      }
      fs.appendFile('log.txt', fileData+'\n', (err) => {
        if (err) throw err;
        console.log(`The data is appended to log.txt file!`);
      });
    }
    else{
      console.log("Couldn't find any upcoming event!!");
    }

  });
}

// If the command is 'spotify-this-song'
function getSpotifySongs(argSearch){
  spotify.search({ type: 'track', query: argSearch,limit: 10 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let fileData = `\r\nCOMMAND: spotify-this-song SEARCH: ${argSearch}\n`;
    let songs = data.tracks.items;
    console.log(`PROCESSING ${argCommand}.....`);
    console.log('\n');
    for (var i=0;i<songs.length;i++){
      let artists = [...songs[i].artists].map(artist => artist.name).join(", ");
      console.log(`Artist(s): ${artists}`);
      console.log("The song's name: "+songs[i].name);
      console.log("The album that the song is from: "+songs[i].album.name);
      console.log(("A preview link: "+songs[i].preview_url)||('No preview available. Full track URL: ' + songs[i].external_urls.spotify));
      console.log('\n----------------------------------------------\n');
      fileData = fileData + `Artist(s): ${songs[i].album.artists[0].name}\nSong: ${songs[i].name}\nAlbum: ${songs[i].album.name}\nPreview: ${songs[i].preview_url}\n--------------------------\n`;
    }
    fs.appendFile('log.txt', fileData+'\n', (err) => {
      if (err) throw err;
      console.log(`The data is appended to log.txt file!`);
    });
  });
}

// If the command is 'movie-this'
function getOmdbMovies(argSearch){
  request(`http://www.omdbapi.com/?t=${argSearch}&apikey=${OMDB_APIKEY}`, function (error, response, body) {
    
    // Print the error if one occurred
    if (error) {
      return console.log('Error occurred: ' + error);
    } 
    let data = JSON.parse(body);
    let fileData = `\r\nCOMMAND: movie-this SEARCH: ${argSearch}\n`;
    console.log(`PROCESSING ${argCommand}.....`);
    console.log('\n');
    console.log(`Title: ${data.Title}`);
    console.log(`Year: ${data.Year}`);
    console.log(`IMDB Rating: ${data.imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
    console.log(`Country: ${data.Country}`);
    console.log(`Language: ${data.Language}`);
    console.log(`Plot: ${data.Plot}`);
    console.log(`Actors: ${data.Actors}`);
    fileData = fileData + `Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n-------------------------------\n`;
    fs.appendFile('log.txt', fileData+'\n', (err) => {
      if (err) throw err;
      console.log(`The data is appended to log.txt file!`);
    });
  });
}

// If the command is 'do-what-it-says'
function getFromFile(){
  let command,
      search;
  fs.readFile('./random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    [command,search] = data.split(',');
    runCommand(command,search);
  });
}
