import React from 'react';
import PropTypes from 'prop-types';
import BankItem from './BankItem';

class BankSelect extends React.PureComponent {
  static propTypes = {
    selection: PropTypes.array.isRequired,
    displayProviders: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    chooseBank: PropTypes.func,
  };

  onFocus = () => {
    this.props.onFocus();
  }

  chooseBank = bank => {
    this.props.chooseBank(bank);
  }

  render() {
    const {
      selection,
      displayProviders,
    } = this.props;
    return (
      <div className="bankselect-container">
        <BankItem
          onClick={this.onFocus}
          name="Choose Your Bank"
          className="choose-a-bank"
          dropdown
        />
        {displayProviders &&
          selection.map((value, index) => {
              return (
                <BankItem
                  key={value.name}
                  name={value.name}
                  onClick={this.chooseBank}
                  className={index === 2 ? 'bank-item-last' : ''}
                />
              );
          })
        }
      </div>
    );
  }
}
export default BankSelect;
