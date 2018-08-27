import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import List from './List';
import SearchBar from './searchBar';
import MenuAppBar from './navBar';
import movieAPIKey from '../../../server/movieKey';
import { findGenre } from '../genres';
import background from '../../tenor.gif';

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

  componentWillMount() {
    this.fetchMovies();
  }

  componentDidMount() {
    // this.fetchAnime();
  }

  fetchMovies() {
    const { movieTitle } = this.state;
    const apiKey = movieAPIKey.movieAPIkey;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`;
    axios
      .get(apiUrl)
      .then(response => {
        this.setState({
          movies: response.data.results,
          genres: findGenre(response.data.results[0].genre_ids),
        });
        console.log(this.state);
        this.fetchAnime(this.state.genres[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchAnime(targetGenre) {
    console.log(targetGenre, typeof targetGenre);
    const aniVar = { genre_in: 'Action' };
    const aniQuery = `
      query {
        Page(page: 1, perPage: 5) {
          media(genre: "${targetGenre}", averageScore_greater: 80, startDate_greater: 2015, sort: TRENDING_DESC) {
            genres,
              title {
              romaji
              english
              native
            },
            averageScore,
              startDate {
              year
            }
          }
        }
      }
    `;

    axios({
      url: 'https://graphql.anilist.co',
      method: 'POST',
      data: {
        query: aniQuery,
      },
    })
      .then(result => {
        this.setState({
          anime: result.data.data['Page'].media,
        });
        console.log(this.state.anime);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({ movieTitle: e.target.value }, () => {
      if (this.state.movieTitle && this.state.movieTitle.length > 1) {
        if (this.state.movieTitle.length % 2 === 0) {
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
              RecAni.me
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
        <List movies={this.state.movies.slice(0, 6)} />
      </div>
    );
  }
}
