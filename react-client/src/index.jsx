import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List';
import movieAPIKey from '../../server/movieKey';
import SearchBar from './components/searchBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], movieTitle: 'lord%20of%20the%20rings' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    const { movieTitle } = this.state;
    const apiKey = movieAPIKey.movieAPIkey;
    console.log(apiKey);
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false&limit=3`;
    axios
      .get(apiUrl)
      .then(response => {
        this.setState({
          items: response.data.results,
        });
        console.log(this.state.items);
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
    console.log(this.state.movieTitle);
  }

  render() {
    return (
      <div>
        <h1>Item List</h1>
        <SearchBar
          term={this.state.movieTitle}
          onChangeValue={this.handleChange}
        />

        <List items={this.state.items.slice(0, 3)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
