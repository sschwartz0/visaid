import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.login.message,
  }
}

@connect(mapStateToProps)
export default class App extends React.Component {
  render () {
    const {
      message,
    } = this.props;
    
    return (
      <div>
        testasdasd
        <p>
          {message}
        </p>
      </div>
    )
  }
}