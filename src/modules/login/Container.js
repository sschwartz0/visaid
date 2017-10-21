import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeMessage } from './actions';

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.login.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => { dispatch(changeMessage(message)) }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends PureComponent {

  onClick = () => {
    console.log('onclick')
    this.props.changeMessage('test')
  }

  render () {
    const {
      changeMessage,
      message,
    } = this.props;

    return <button onClick={this.onClick}> the action {message}!</button>;
  }
}