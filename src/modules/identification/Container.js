import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SafetyCode from './SafetyCode/SafetyCode';
import Permissions from './Permissions/Permissions';
import { changeStatus, formChange, generateCode, requestPermission } from './actions';

const mapStateToProps = state => {
  const {
    identification: {
      code,
      isRequesting,
      permissions,
      status,
    },
  } = state;

  return {
    code,
    isRequesting,
    permissions,
    status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: status => { dispatch(changeStatus(status)); },
    formChange: change => { dispatch(formChange(change)); },
    generateCode: () => { dispatch(generateCode()); },
    requestPermission: permission => { dispatch(requestPermission(permission)); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Identification extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    changeStatus: PropTypes.func,
    generateCode: PropTypes.func,
    formChange: PropTypes.func,
    isRequesting: PropTypes.bool,
    permissions: PropTypes.object,
    requestPermission: PropTypes.func,
    isSendingResponse: PropTypes.bool,
    status: PropTypes.string,
  };

  onFormChange = async field => {
    const {
      code,
      formChange,
      changeStatus,
      status,
    } = this.props;
    
    await formChange(field);

    if (code.length === 5 && status !== 'SENDING')
      changeStatus('SENDING');
  
    if (code.length <= 6 && status === 'SENDING')
      changeStatus(undefined);
    };
  
  onRequestPermission = async permission => {
    const {
      changeStatus,
      generateCode,
      requestPermission,
      status,
    } = this.props;
    
    if (status === undefined) {
      changeStatus('REQUESTING');
      generateCode();
    }

    requestPermission(permission);
  };
  
  render() {
    const {
      code,
      permissions,
      isRequesting,
      isSendingResponse,
      status,
    } = this.props;

    return (
      <div>
        <SafetyCode
          code={code}
          formChange={this.onFormChange}
          status={status}
        />
        <Permissions
          code={code}
          permissions={permissions}
          onRequestPermission={this.onRequestPermission}
          isSendingResponse={isSendingResponse}
          status={status}
        />
      </div>
    );
  }
}
