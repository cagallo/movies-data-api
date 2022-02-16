# Rotten Tomatillos API
## Endpoints
- Get all movies => `api/v1/movies`
    
- Get movie by id => `api/v1/movies/:id`
    
- Get a movie's trailers by id => `api/v1/movies/:id/videos`


API is deployed on Heroku: [Rancid Tomatillos API](https://rancid-tomatillos-api2110.herokuapp.com/api/v1/movies)


## File Generator Utility
- Uses existing Heroku API provided by Turing to generate complete data files for movies and their respective trailers.
- Files are then used as data source for the API.
- Utilizes a progress bar

## Installation Instructions

- Clone down this [repo](https://github.com/cagallo/movies-data-api.git) 
- `cd` into directory 
- run `npm i express`

If Turing API has updates, can regenerate the list
- Run with `node utils/movie-data-generator` 
- Files are saved in `/data-files`

If no updates
- run `nodemon server.js`
- go to localhost:3001

Potential Issues:
- Heroku API must be up
- Any changes to Heroku API e.g URL path or shape of response data could break functionality

Improvements:
- Create .js files with `export default` appended to make files immediately usable
    - Currently objects must be copied into correct format.
- Looking into streaming data objects to file as they are retrieved vs writing to an array and then writing the array to a file.
    - Writing all objects to an array is not scalable as they're stored in memory in the array before being written to file. If >= 2GB of movie data, the array could not hold them.
    - A stream would write the object to file then release it from memory, only ever storing 1 object in memory.

## Authors

- [Chez Gallo](https://github.com/cagallo)

- Code Review/Contributor = [Travis Roberts](https://github.com/trobe026)
