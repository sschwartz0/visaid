import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formChange, onSubmit, displayProvidersFunc, chooseBank } from './actions';

import InputText from '../../components/InputText';
import Button from '../../components/Button';
import BankSelect from '../../components/BankSelect';

const mapStateToProps = state => {
  const {
    bank,
    displayProviders,
    isLoginFormShown,
    selection,
  } = state.login;
  return {
    bank,
    displayProviders,
    isLoginFormShown,
    selection,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    formChange: (change) => { dispatch(formChange(change)); },
    onSubmit: () => { dispatch(onSubmit()); },
    displayProvidersFunc: () => { dispatch(displayProvidersFunc()); },
    chooseBank: bank => { dispatch(chooseBank(bank)); }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends PureComponent {
  static propTypes = {
    formChange: PropTypes.func,
    onSubmit: PropTypes.func,
    displayProvidersFunc: PropTypes.func,
    bank: PropTypes.any,
    displayProviders: PropTypes.bool,
    isLoginFormShown: PropTypes.bool,
    chooseBank: PropTypes.func,
    selection: PropTypes.array,
  };

  onFormChange = field => {
    this.props.formChange(field);
  }
  
  onSubmit = submit => {
    this.props.onSubmit(submit);
  }

  displayProvidersFunc = () => {
    this.props.displayProvidersFunc();
  }

  chooseBank = bank => {
    this.props.chooseBank(bank);
  }

  render() {
    const {
      bank,
      displayProviders,
      isLoginFormShown,
      selection,
    } = this.props;
    console.log('bank', bank);
    return (
      <div>
        {
          bank !== undefined ?
            <div>
              <InputText
                className="test"
                disabled={false}
                value={undefined}
                placeholder="Username/Email"
                name="username"
                onChange={this.onFormChange}
              />
              <br />
              <InputText
                className="test"
                disabled={false}
                value={undefined}
                placeholder="Password"
                name="password"
                onChange={this.onFormChange}
              />
              <br />
              <Button
                text="button"
                onClick={this.onSubmit}
              />
            </div>
          :
            <div>
              <BankSelect
                selection={selection}
                bank={bank}
                displayProviders={displayProviders}
                isLoginFormShow={isLoginFormShown}
                onFocus={this.displayProvidersFunc}
                chooseBank={this.chooseBank}
              />
            </div>
        }
      </div>
    );
  }
}
