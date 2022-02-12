const movies = require("./movies-data.js");
const trailers = require("./trailers-data.js");

const express = require('express');
var cors = require('cors')
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Movies Data';
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('Oh hey there');
});

app.get('/api/v1/movies', (request, response) => {
  response.json({ movies }); 
});

app.get('/api/v1/movies/:id', cors(), (request, response) => {
  const movieId = request.params.id;
  const movie = movies.find(movie => {
    return parseInt(movieId) === movie.id;
  });
  response.json({ movie });
});

app.get('/api/v1/movies/:id/videos', cors(), (request, response) => {
  const movieId = request.params.id;
  const videos = trailers.find(movieTrailer => {
    return movieTrailer[movieId]
  });
  response.json(videos[movieId]);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});



