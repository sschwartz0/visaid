import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission';
import Button from '../../../components/Button';

export default class Permissions extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    permissions: PropTypes.object,
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
      onRequestPermission,
      onSendVerification,
      status,
    } = this.props;

    return (
      <div>
        {Object.entries(permissions).map(([key, {
          name,
          description,
          requested,
          value,
          }]) => {
            if (status === 'SENDING' && requested)
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
