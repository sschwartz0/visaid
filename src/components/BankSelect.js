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
      <div>
        {
          displayProviders
          ?
            selection.map(
              value => {
                return (
                  <BankItem
                    key={value.name}
                    name={value.name}
                    onClick={this.chooseBank}
                  />
                );
            })
          :
            <BankItem
              onClick={this.onFocus}
              name="Choose a Bank"
            />
        }
      </div>
    );
  }
}
export default BankSelect;
