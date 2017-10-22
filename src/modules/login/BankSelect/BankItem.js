import React from 'react';
import PropTypes from 'prop-types';

class BankSelect extends React.PureComponent {
  static propTypes = {
    // selection: PropTypes.array.isRequired,
    // bank: PropTypes.any.isRequired,
    // displayProviders: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.name);
  }

  render() {
    const {
      name,
      logo,
      className,
      dropdown,
    } = this.props;
    if (dropdown) {
      return (
      <div 
        className={`choose-a-bank mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect`} 
        onClick={this.onClick}
      >
        <span> {name} </span>
        <i className="material-icons">keyboard_arrow_down</i>
      </div>
      )
    }
    else if (!dropdown) {
    return(
      <div 
        className={`bank-item mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect ${className}`} 
        onClick={this.onClick}
      >
        <span style={{ color: "#FFF" }}> {name} </span>
        {logo}
      </div>
    )
  }
  }
}
export default BankSelect;
