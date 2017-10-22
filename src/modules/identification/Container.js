import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SafetyCode from './SafetyCode/SafetyCode';
import Permissions from './Permissions/Permissions';
import { formChange, generateCode, requestPermission } from './actions';

const mapStateToProps = state => {
  const {
    identification: {
      code,
      isRequesting,
      permissions,
    },
  } = state;

  return {
    code,
    isRequesting,
    permissions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    formChange: (change) => { dispatch(formChange(change)); },
    generateCode: () => { dispatch(generateCode()); },
    requestPermission: (permission) => { dispatch(requestPermission(permission)); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Identification extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    generateCode: PropTypes.func,
    formChange: PropTypes.func,
    isRequesting: PropTypes.bool,
    permissions: PropTypes.object,
    requestPermission: PropTypes.func,
  };

  onFormChange = field => {
    this.props.formChange(field);
  }
  
  onRequestPermission = permission => {
    this.props.requestPermission(permission);
  }

  generateCode = () => {
    this.props.generateCode();
  };
  
  render() {
    const {
      code,
      permissions,
      isRequesting,
    } = this.props;

    return (
      <div>
        <SafetyCode
          code={code}
          formChange={formChange}
          isRequesting={isRequesting}
        />
        <button onClick={this.generateCode}> Generate code </button>
        <Permissions
          permissions={permissions}
          onRequestPermission={this.onRequestPermission}
        />
      </div>
    );
  }
}
