import React, { PureComponent } from 'react';
import Login from './login/Container';

export default class Message extends PureComponent {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
