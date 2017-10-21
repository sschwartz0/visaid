import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Login from './login/Container'
import { changeMessage } from '../modules/login/actions';

export default class Message extends PureComponent {

  render () {
    return (
      <div>
        <Login />
      </div>
    )
  }
}