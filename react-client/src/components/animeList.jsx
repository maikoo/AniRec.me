import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AnimeListItem from './animeListItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class AnimeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: '16',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key) {
    return key => (event, value) => {
      this.setState({
        [key]: value,
      });
    };
  }

  render() {
    const { anime, classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {anime.map((ani, key) => (
              <Grid key={key} item>
                <AnimeListItem ani={ani} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AnimeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimeList);
