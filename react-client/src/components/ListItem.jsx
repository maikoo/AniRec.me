import React from 'react';
import styled from 'styled-components';
import { findGenre } from '../genres';

const ListItem = props => {
  const url = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
    props.item.poster_path
  }`;
  const Image = styled.img`
    height: 300px;
    width: auto;
  `;
  return (
    <div>
      <Image src={url} />
      <h3>{props.item.title}</h3>
      <div>{props.item.overview.slice(0, 100)}</div>
      <div>{findGenre(props.item.genre_ids)}</div>
    </div>
  );
};

export default ListItem;
