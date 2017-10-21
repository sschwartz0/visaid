import React from 'react';

require('../assets/styles.css');

class Button extends React.PureComponent {
  render() {
    const {
      onclick,
      text,
    } = this.props;
    return (
      <button onClick={onclick}>
        {text}
      </button>
    );
  }
}
export default Button;
