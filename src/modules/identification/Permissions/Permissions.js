import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission';
import ReceivedPermission from './ReceivedPermission';
import Button from '../../../components/Button';

export default class Permissions extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    permissions: PropTypes.object,
    sentPermissions: PropTypes.object,
    onRequestPermission: PropTypes.func,
    onSendVerification: PropTypes.func,
  };
  
  static defaultProps = {
    enabled: true,
  };

  render() {
    const {
      enabled,
      permissions,
      sentPermissions,
      onRequestPermission,
      onSendVerification,
      status,
    } = this.props;

    return (
      <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {status === 'SENT' &&
          <div className="applicant-congrats">
            <h1>Congrats, it was sent!</h1>
            <img src="http://www.myiconfinder.com/uploads/iconsets/256-256-c0829a49b2acd49adeab380f70eb680a-accept.png" alt="check" height="125px" width="auto" />
          </div>
        }
        {status === 'RECEIVED' && Object.entries(sentPermissions).map(([key, value]) => {
          return (
            <ReceivedPermission
              key={key}
              name={key}
              value={value}
            />
          );
          })
        }
        {status !== 'SENT' && status !== 'RECEIVED' && Object.entries(permissions).map(([key, {
          name,
          description,
          requested,
          value,
          }]) => {
            if (status === 'SENDING' && requested) {
              return (
                <Permission
                  key={key}
                  permissionKey={key}
                  enabled
                  name={name}
                  description={description}
                  requested={requested}
                  value={value}
                  onRequestPermission={onRequestPermission}
                  status={status}
                />
              );
            }
            else if (status !== 'SENDING')
              return (
                <Permission
                  key={key}
                  permissionKey={key}
                  enabled={enabled}
                  name={name}
                  description={description}
                  requested={requested}
                  value={value}
                  onRequestPermission={onRequestPermission}
                  status={status}
                />
              );
        })}
        {status === 'SENDING' && 
          <Button
            text="Send your verification"
            onClick={onSendVerification}
          />
        }
      </div>

    );
  }
}
