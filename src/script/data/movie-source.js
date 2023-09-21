/* eslint-disable prefer-promise-reject-errors */
import fetch from 'node-fetch';

class MovieSource {
  static discoverMovie(page = 1) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        const { results } = responseJson;
        if (results) {
          return Promise.resolve(results); // Return the results
        }
        return Promise.reject('tidak ada data!');
      })
      .catch((err) => Promise.reject(err));
  }

  static getDetailMovie(movieID) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        const { backdrop_path: backdropPath } = responseJson;
        if (backdropPath) {
          return Promise.resolve(responseJson); // Return the detail
        }
        return Promise.reject('ID tidak ditemukan!');
      })
      .catch((err) => Promise.reject(err));
  }

  static findMovie(movieName, page = 1) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        const { results } = responseJson;
        if (results) {
          return Promise.resolve(results); // Return the results
        }
        return Promise.reject('tidak ada data!');
      })
      .catch((err) => Promise.reject(err));
  }
}

export default MovieSource;
