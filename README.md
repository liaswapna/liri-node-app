# LIRI_BOT(Language Interpretation and Recognition Interface)
### Overview
---
LIRI Bot is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Requirements
---
1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. To retrieve the data that will power this app, you'll need to send requests to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

### Getting Started
---
* Clone down repo.
* Run command 'npm install' in Terminal or GitBash
* Run command 'node liri.js' or one of the accepted commands below.

### Accepted Commands
---

<dl>
  <dt><code>concert-this [band name]</code></dt>
  <dd>displays upcoming event information about <code>[band name]</code></dd>
  <dt><code>spotify-this-song [song name]</code></dt>
  <dd>displays Spotify information about <code>[song name]</code></dd>
  <dt><code>movie-this [movie name]</code></dt>
  <dd>displays OMDB information about <code>[movie name]</code></dd>
  <dt><code>do-what-it-says</code></dt>
  <dd>performs the command specified in <code>random.txt</code></dd>
</dl>

### Technologies Used
---
* Node js


## Dependencies
---
```js
{
  "dotenv": "^6.2.0",
  "inquirer": "^6.2.1",
  "moment": "^2.22.2",
  "node-spotify-api": "^1.0.7",
  "request": "^2.88.0"
}
```
### Code Explanation
---
Corresponding output is displayed on terminal, When the following commands are used:
1. `node liri.js concert-this <artist/band name here>`
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * The Spotify API requires you sign up as a developer to generate the necessary credentials.
4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.

5. It also uses inquirer to prompt the users to select the choices.
    * Using `var inquirer = require('inquirer`)the program gives User choices if they are confused with commands.
    * A prompt is implemented to make the user to type in the favourite movie,song or band name.
    * Another prompt helps the user to continue or quit the App.
#### Additional Features

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* The command is appended to the `log.txt` file. 

* The file is not overwritten each time the command is run.

* Prompts used to make user choices, and type in the favourite movie, song & band name, also helps user to continue or quit the app.(It helps the user if they are confused with the commands)

### NOTE
* [watch the demo video](https://drive.google.com/file/d/1fCxJCBItGf471Iui5vDy2oUa1_tobGib/view?usp=sharing)



