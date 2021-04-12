module.exports = {
  async find({results}) {
    try {
      const getGenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US');
      const genres = await getGenres.json();

      results.map(movie => {
        movie.genres = [];

        genres.genres.find(({id, name}) => {
          if (movie.genre_ids.includes(id)) movie.genres.push(name);
        })
      });

      return results;
    } catch(err) {
      console.error(err);
    }
  }
}