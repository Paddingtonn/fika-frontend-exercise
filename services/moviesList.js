module.exports = {
  async get(page, searchPhrase) {
    let url;

    if (searchPhrase) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=${page}&include_adult=false&query=${searchPhrase}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=${page}&include_adult=false`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch(err) {
      console.error(err)
    }
  }
};