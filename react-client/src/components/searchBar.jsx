import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.setState({
      searchTerm: this.search.value,
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
          value={this.props.value}
          onChange={this.props.onChangeValue}
        />
        <p>{this.state.searchTerm}</p>
      </form>
    );
  }
}
