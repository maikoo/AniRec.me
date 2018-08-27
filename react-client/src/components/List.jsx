import React from 'react';
import ListItem from './ListItem.jsx';

const List = props => (
  <div>
    <h4> List Component </h4>
    There are {props.movies.length} movies.
    {props.movies.map((movie, key) => (
      <ListItem key={key} movie={movie} />
    ))}
  </div>
);

export default List;
