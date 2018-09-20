import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 'auto',
    width: 300,
    maxHeight: 300,
    maxWidth: 300,
    paddingTop: '56.25%', // 16:9
    objectFit: 'contain',
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

class AnimeListItem extends Component {
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
    const { ani } = this.props;

    // console.log(ani);
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="ani" className={classes.avatar}>
              A
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={ani.title.romaji}
          subheader={ani.startDate.year}
        />
        <CardMedia
          className={classes.media}
          image={ani.coverImage.large}
          title={ani.title.romaji}
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
              {ani.genres.join(', ')}
            </Typography>
            <Typography paragraph>{ani.episodes} eps,</Typography>
            <Typography paragraph>
              {ani.description.slice(0, 150) + '...'}
            </Typography>
            <Typography paragraph>
              Anime Popularity: {' ' + ani.popularity}
            </Typography>
            <Typography>
              Vote Average:
              {' ' + Math.floor(ani.averageScore * 0.1)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

AnimeListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimeListItem);
