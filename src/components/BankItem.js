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
    } = this.props;
    return (
      <div 
        className="bankItem" 
        onClick={this.onClick}>
        {name}
        {logo}
      </div>
    );
  }
}
export default BankSelect;
