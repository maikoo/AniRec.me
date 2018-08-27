import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <App />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('app'));
