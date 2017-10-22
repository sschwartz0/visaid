import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formChange, onSubmit, displayProvidersFunc, chooseBank } from './actions';

import InputText from '../../components/InputText';
import Button from '../../components/Button';
import BankSelect from './BankSelect/BankSelect';
import Header from './Welcome/Header';

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

    return (
      <div className="login-container">
      <div style={{ textAlign: "center" }}> <img src={require('../../assets/logo1.png')} width="400px" height="100px" style={{ paddingBottom: "50px", marginLeft: "-20px" }} />
      </div>
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
            <BankSelect
              selection={selection}
              bank={bank}
              displayProviders={displayProviders}
              isLoginFormShow={isLoginFormShown}
              onFocus={this.displayProvidersFunc}
              chooseBank={this.chooseBank}
            />
        }
        {!displayProviders || !bank && 
          <div className="value-proposition">
            <h5>Feel secure no matter what you do, who you meet or where you are</h5>
          </div>
        }
        {/* <div className="value-tagline">
          <h6>DIGITAL SECURITY FOR THE PHYSICAL WORLD</h6>
        </div> */}
    </div>
    );
  }
}
