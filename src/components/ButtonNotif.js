import React from 'react';
import PropTypes from 'prop-types';

class ButtonNotif extends React.PureComponent {
  static propTypes = {
    // onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const {
      // onClick,
      text,
    } = this.props;
    const style = {
      // 'marginLeft': 'auto',
      // 'marginRight': 'auto',
      // 'border-radius': '2px !important',
    };
    return (
      <button 
        /* onClick={onClick} */
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect border-radius"
        style={style}
      >
        {text}
      </button>
    );
  }
}
export default ButtonNotif;
