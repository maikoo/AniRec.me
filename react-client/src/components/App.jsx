import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from './List';
import SearchBar from './searchBar';
import MenuAppBar from './navBar';
import movieAPIKey from '../../../server/movieKey';
import { findGenre } from '../genres';
import background from '../../original.gif';
import AnimeList from './animeList';
import { withStyles } from '@material-ui/core';
import { debounce } from 'debounce';

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

const styles = theme => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    // maxWidth: 500,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieTitle: '',
      genres: [],
      anime: [],
      hideImage: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillMount() {}

  componentDidMount() {
    // this.fetchMovies();
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
        // console.log(this.state);
        this.fetchAnime(this.state.genres);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchAnime(targetGenre) {
    console.log(targetGenre);
    // const aniVar = targetGenre;
    const aniQuery = `
      query {
        Page(page:1, perPage:5) {
          media(genre_in: ${JSON.stringify(
            targetGenre
          )}, averageScore_greater: 70, startDate_greater: 2015 ) {
            genres,
            title{
              romaji
              english
            },
            averageScore,
            popularity,
            startDate {
              year
            },
            episodes,
            description,
            coverImage {
              large
            },
          }
        }
      }
    `;

    axios({
      url: 'https://graphql.anilist.co',
      method: 'POST',
      data: {
        query: aniQuery,
        // variables: { genres_in: targetGenre },
      },
    })
      .then(result => {
        this.setState({
          anime: result.data.data['Page'].media,
        });
        // console.log(this.state.anime);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    // console.log(e.key, typeof e.key);
    // if (e.key === 'Enter') {
    this.setState({ movieTitle: e.target.value }, () => {
      if (this.state.movieTitle && this.state.movieTitle.length > 1) {
        if (this.state.movieTitle.length > 4) {
          this.fetchMovies();
          this.fetchAnime(this.state.genres);
          this.setState({ hideImage: true });
        }
      }
    });
    // }
  }

  render() {
    // let hidden = <Image src={background} />;
    const whiteFont = { color: 'white' };
    const whiteBackground = {
      border: '2px solid white',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    };
    const { classes } = this.props;
    // if (this.state.hideImage === true) {
    //   hidden = null;
    // }
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
          <Image src={background} />;
          <TitleDiv>
            <Typography style={whiteFont} variant="display4">
              RecAni.me
            </Typography>

            <Section style={whiteBackground}>
              <SearchBar
                term={this.state.movieTitle}
                onChangeValue={this.handleChange}
              />
            </Section>
          </TitleDiv>
        </Container>
        <br />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <List
                className={classes.paper}
                movies={this.state.movies.slice(0, 2)}
              />
            </Grid>
            <Grid item xs={6}>
              <AnimeList
                className={classes.paper}
                anime={this.state.anime.slice(0, 2)}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
