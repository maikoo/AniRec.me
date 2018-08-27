import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import CssBaseline from '@material-ui/core/CssBaseline';
import List from './List';
import movieAPIKey from '../../../server/movieKey';
import SearchBar from './searchBar';
import MenuAppBar from './navBar';
import { findGenre } from '../genres';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieTitle: 'lord%20of%20the%20rings',
      genres: [],
      anime: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    const { movieTitle } = this.state;
    const apiKey = movieAPIKey.movieAPIkey;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false&limit=3`;
    axios
      .get(apiUrl)
      .then(response => {
        this.setState({
          movies: response.data.results,
          genres: findGenre(response.data.results[0].genre_ids),
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({ movieTitle: e.target.value }, () => {
      if (this.state.movieTitle && this.state.movieTitle.length > 1) {
        if (this.state.movieTitle.length % 2 === 0) {
          // console.log(this.state.movieTitle);
          this.fetchMovies();
        }
      }
    });
  }

  render() {
    return (
      <div>
        <MenuAppBar />
        <h1>Movies to Anime</h1>
        <SearchBar
          term={this.state.movieTitle}
          onChangeValue={this.handleChange}
        />
        <List movies={this.state.movies.slice(0, 1)} />
      </div>
    );
  }
}
