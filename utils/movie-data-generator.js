import fs from 'fs';
import movieData from '../movies-data.js';
import fetch from 'node-fetch';
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';

const totalMovies = movieData.length;
const populatedMovies = [];
const trailers = [];

(async()=> {
    console.log('getting movie and trailer data...');
    const progressBar = new cliProgress.SingleBar({ format: 'Data Retrieval Progress |' + colors.cyan('{bar}') + '|{percentage}% {value}/{total} Movies',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true });
    let movieNum = 0;
    progressBar.start(totalMovies, movieNum);

    for (const movie of movieData) {
        // get each movie's entire data object from existing heroku endpoint
        const movieData = await fetchData(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movie.id}`);
        const populatedMovie = Object.assign(movie, movieData.movie);
        populatedMovies.push(populatedMovie);

        // get each movie's trailer data
        const trailerData = await fetchData(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movie.id}/videos`);
        const trailer = {};

        // each movieId is assigned array of related videos
        trailer[movie.id] = [];
        for (const video of trailerData.videos) {
            trailer[movie.id].push(video);
        }
        trailers.push(trailer);

        movieNum++;
        progressBar.update(movieNum);
    }

    progressBar.stop();
    console.log('Generated movie and trailer data successfully. Writing to files to /data-files...');

    fs.writeFileSync('./data-files/populated-movies.json', JSON.stringify(populatedMovies, 0, 4));
    fs.writeFileSync('./data-files/trailers.json', JSON.stringify(trailers, 0, 4));
    console.log('Files written successfully.');
})();

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}