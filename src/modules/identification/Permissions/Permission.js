import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Permission extends PureComponent {
  static propTypes = {
    enabled: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,
    requested: PropTypes.bool,
    value: PropTypes.string,
    onRequestPermission: PropTypes.func,
    permissionKey: PropTypes.string,
  };
  
  onRequestPermission = () => {
    const {
      permissionKey,
      requested,
    } = this.props;

    this.props.onRequestPermission({
      requested: !requested,
      permissionKey,
    });
  }

  render() {
    const {
      enabled,
      name,
      description,
      requested,
      value,
      permissionKey,
    } = this.props;

    return (
      <div>
        <label 
          htmlFor={permissionKey}
        >
          {name} - {description}
        </label>
        <input
          type="checkbox"
          name={permissionKey}
          checked={requested}
          disabled={!enabled}
          onChange={this.onRequestPermission}
        />
      </div>

    );
  }
}
