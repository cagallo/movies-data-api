import movieData from '../movies-data.js';
import fetch from 'node-fetch';
import fs from 'fs';

const totalMovies = movieData.length;

const populatedMovies = [];
const trailers = [];

console.log('getting movie and trailer data...');

async function generateDataFiles() {
    let movieNum = 1;
    for (const movie of movieData) {
    // get each movie's entire data object from existing heroku endpoint
        const moviesResponse = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies/' + movie.id);
        const movieData = await moviesResponse.json();
        const populatedMovie = Object.assign(movie, movieData.movie);
        populatedMovies.push(populatedMovie);

        // get each movie's trailer data, each movieId assigned array of related videos
        const trailerResponse = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies/' + movie.id + '/videos');
        const trailerData = await trailerResponse.json();
        const trailer = {};
        trailer[movie.id] = [];
        for (const video of trailerData.videos) {
            trailer[movie.id].push(video);
        }
        trailers.push(trailer);

        console.log(`processed movie: ${movieNum} of ${totalMovies}`);
        movieNum++;
    }

    console.log('Generated movie and trailer data successfully. Writing to file...');

    fs.writeFileSync('./data-files/populated-movies.json', JSON.stringify(populatedMovies, 0, 4));
    fs.writeFileSync('./data-files/trailers.json', JSON.stringify(trailers, 0, 4));
}

generateDataFiles();
