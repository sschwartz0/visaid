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
  
  state = {
    showDescription: false,
  }
  
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
  
  onShowDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription,
    });
  };

  render() {
    const {
      enabled,
      name,
      description,
      requested,
      value,
      permissionKey,
    } = this.props;
    
    const {
      showDescription,
    } = this.state;

    return (
      <div className="permission-container">
        <div className="permission-box">
          <div onClick={this.onShowDescription} style={{ flexGrow: 2 }}>
            <label 
              htmlFor={permissionKey}
            >
              {name}
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name={permissionKey}
              checked={requested}
              disabled={!enabled}
              onChange={this.onRequestPermission}
            />
            </div>
          </div>
        {showDescription &&
          <div onClick={this.onShowDescription} className="permission-description">
            {description}
          </div>
        }
      </div>

    );
  }
}
