import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      text,
    } = this.props;
    const style = {
      'border-radius': '2px !important',
      width: '233px',
    };
    return (
      <button 
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect border-radius buttonKey"
        style={style}
      >
        {text}
      </button>
    );
  }
}
export default Button;
