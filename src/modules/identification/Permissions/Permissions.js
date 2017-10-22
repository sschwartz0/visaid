import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission';

export default class Permissions extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    permissions: PropTypes.object,
    onRequestPermission: PropTypes.func,
  };
  
  static defaultProps = {
    enabled: true
  };

  render() {
    const {
      enabled,
      permissions,
      onRequestPermission,
    } = this.props;

    return (
      <div>
        {Object.entries(permissions).map(([key, {
          name,
          description,
          requested,
          value,
          }]) => {
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
            />
          );
        })}
      </div>

    );
  }
}
