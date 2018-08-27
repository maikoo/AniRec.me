import React, { Component } from 'react';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TheatreIcon from '@material-ui/icons/Theaters';
import { TextField } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const whiteFont = { color: 'white' };
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          {/* <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
          >
            Custom CSS
          </InputLabel> */}
          <TextField
            //label="You want Anime recommendations for..."
            autoFocus={true}
            type="text"
            placeholder="Search for..."
            value={this.props.value}
            onChange={this.props.onChangeValue}
            id="full-width"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TheatreIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText id="name-helper-text">
            Search favorite movies
          </FormHelperText>

          {/* <FormControl className={classes.margin}>
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              htmlFor="custom-css-input"
            >
              Custom CSS
            </InputLabel>
            <Input
              fullWidth
              classes={{
                underline: classes.cssUnderline,
              }}
              id="custom-css-input full-width"
              margin="dense"
            />
          </FormControl> */}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
