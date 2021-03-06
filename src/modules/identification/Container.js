import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SafetyCode from './SafetyCode/SafetyCode';
import Permissions from './Permissions/Permissions';
import { 
  changeStatus, 
  formChange,
  longPoll,
  requestPermission, 
  sendCode,
  sendVerification,
} from './actions';

const mapStateToProps = state => {
  const {
    identification: {
      code,
      isRequesting,
      permissions,
      sentPermissions,
      requestStatus,
      status,
    },
  } = state;

  return {
    code,
    isRequesting,
    permissions,
    sentPermissions,
    requestStatus,
    status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: status => { dispatch(changeStatus(status)); },
    formChange: change => { dispatch(formChange(change)); },
    longPoll: code => { dispatch(longPoll(code)); },
    requestPermission: permission => { dispatch(requestPermission(permission)); },
    sendCode: code => { dispatch(sendCode(code)); },
    sendVerification: () => { dispatch(sendVerification()); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Identification extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    changeStatus: PropTypes.func,
    formChange: PropTypes.func,
    isRequesting: PropTypes.bool,
    longPoll: PropTypes.func,
    permissions: PropTypes.object,
    sentPermissions: PropTypes.object,
    requestPermission: PropTypes.func,
    isSendingResponse: PropTypes.bool,
    requestStatus: PropTypes.string,
    status: PropTypes.string,
    sendCode: PropTypes.func,
    sendVerification: PropTypes.func,
  };
  
  componentWillReceiveProps = (nextProps) => {
    const {
      status,
      requestStatus,
      changeStatus,
    } = this.props;
    
    if (this.props.code !== nextProps.code && status === "REQUESTING") {
      console.log(this.props.code, nextProps.code)
      this.props.longPoll(nextProps.code)
    }
  }

  onFormChange = async field => {
    const {
      formChange,
      changeStatus,
      status,
      sendCode,
    } = this.props;

    await formChange(field);

    if (field.value.length === 6) {
      changeStatus('SENDING');
      sendCode(field.value);
    }
  
    if (field.value.length !== 6 && status === 'SENDING')
      changeStatus(undefined);
  };
  
  onRequestPermission = permission => {
    const {
      changeStatus,
      requestPermission,
      status,
    } = this.props;
    
    if (status === 'IDLE') {
      changeStatus('REQUESTING');
    }

    requestPermission(permission);
  };
  
  onSendVerification = () => {
    this.props.sendVerification();
    this.props.changeStatus('SENT')
  };

  render() {
    const {
      code,
      permissions,
      sentPermissions,
      status,
    } = this.props;

    return (
      <div className="identification-container">
        <div style={{ textAlign: "center" }}> 
          <img src={require('../../assets/logo1.png')} width="400px" height="100px" style={{ paddingBottom: "0px", marginLeft: "-40px" }} />
        </div>
        <div>
        {status === "IDLE" && <div> 
          <h6>Want to verify someone? Check what you want to see and we'll generate a unique code to give the other person.`</h6>
        </div>
        }
        </div>
        <SafetyCode
          code={code}
          formChange={this.onFormChange}
          status={status}
        />
        <Permissions
          code={code}
          enabled={status !== 'SENDER_WAITING'}
          permissions={permissions}
          sentPermissions={sentPermissions}
          onRequestPermission={this.onRequestPermission}
          onSendVerification={this.onSendVerification}
          status={status}
        />
      </div>
    );
  }
}
