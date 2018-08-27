import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { findGenre } from '../genres';

const img = {
  objectFit: 'contain !important',
  maxWidth: 400,
};

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 'auto',
    width: 400,
    maxHeight: 300,
    maxWidth: 400,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { classes } = this.props;
    const { movie } = this.props;
    const movieURL = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
      movie.poster_path
    }`;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Movie" className={classes.avatar}>
              {/* {movie.title.slice(0, 1)} */}M
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={movie.title}
          subheader={movie.release_date.slice(0, 4)}
        />
        <CardMedia
          className={classes.media}
          image={movieURL}
          title={movie.title}
        />
        <CardContent>
          <Typography component="p" />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Genres:
            </Typography>
            <Typography paragraph>{findGenre(movie.genre_ids)}</Typography>
            <Typography paragraph>
              {movie.overview.slice(0, 150) + '...'}
            </Typography>
            <Typography paragraph>
              Movie Popularity: {' ' + movie.popularity}
            </Typography>
            <Typography>
              Vote Average:
              {' ' + movie.vote_average}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

MovieItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieItem);
