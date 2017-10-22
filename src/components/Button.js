import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      onClick,
      text,
    } = this.props;
    const style = {
      'marginLeft': 'auto',
      'marginRight': 'auto',
    };
    return (
      <button 
        onClick={onClick}
        className="bank-item mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        style={style}
      >
        {text}
      </button>
    );
  }
}
export default Button;
