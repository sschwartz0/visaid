import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './login/Container';
import Identification from './identification/Container';

const mapStateToProps = (state, ownProps) => {
  const {
    login: {
      loggedIn,
    },
  } = state;

  return {
    loggedIn,
  };
};

@connect(mapStateToProps, {})
export default class App extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool,
  }

  render() {
    const {
      loggedIn,
    } = this.props;
    return (
      <div>
        {!loggedIn ?
          <Login />
          :
          <Identification />
        }
      </div>
    );
  }
}
