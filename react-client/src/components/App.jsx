import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './List';
import movieAPIKey from '../../../server/movieKey';
import SearchBar from './searchBar';
import MenuAppBar from './navBar';
import { findGenre } from '../genres';
import background from '../../tenor.gif';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
  height: auto;
  width: 100%;
`;
const Section = styled.div`
  margin-right: 1.8rem;
  margin-left: 1.8rem;
  padding-right: 20px;
  padding-left: 20px;
`;

const TitleDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  color: white !important;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieTitle: 'mission impossible',
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

  fetchAnime() {
    const genres = this.state;
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
    const overlay = styled.div``;
    const whiteFont = { color: 'white' };
    return (
      <div>
        <MenuAppBar />
        <br />
        <Section>
          <SearchBar
            term={this.state.movieTitle}
            onChangeValue={this.handleChange}
          />
        </Section>
        <br />
        <Container>
          <Image src={background} />
          <TitleDiv>
            <Typography style={whiteFont} variant="display3">
              Movies to Anime
            </Typography>
            <Section>
              <SearchBar
                term={this.state.movieTitle}
                onChangeValue={this.handleChange}
              />
            </Section>
          </TitleDiv>
        </Container>
        <br />
        <List movies={this.state.movies.slice(0, 3)} />
      </div>
    );
  }
}
