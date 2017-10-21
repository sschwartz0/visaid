import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputText from '../../components/InputText';
import { formChange } from './actions';

const mapStateToProps = state => {
  return {
    message: state.login.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    formChange: (change) => { dispatch(formChange(change)); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends PureComponent {
  onFormChange = field => {
    this.props.formChange(field);
  }

  render() {
    return (
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
      </div>
    );
  }
}
