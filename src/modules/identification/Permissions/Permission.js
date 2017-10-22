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
    
    this.setState({
      showDescription: !requested,
    })
  }
  
  onShowDescription = () => {
    if (!this.props.requested)
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
      <div>
        <div onClick={this.onShowDescription}>
          <label 
            htmlFor={permissionKey}
          >
            {name} - 
          </label>
          <input
            type="checkbox"
            name={permissionKey}
            checked={requested}
            disabled={!enabled}
            onChange={this.onRequestPermission}
          />
        </div>
        {showDescription &&
          <div>
            {description}
          </div>
        }
      </div>

    );
  }
}
