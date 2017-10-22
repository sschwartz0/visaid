import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ReceivedPermission extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
  };

  render() {
    const {
      name,
      value,
    } = this.props;

    return (
      <div>
        {value ?
          <div className="received-permission-container"> 
            <div className="received-permission-box">
              <div>
                <span style={{ fontSize: '20px', lineHeight: '20px', marginBottom: '10px' }}>{name}</span>
              </div>
              <div className="received-value">
                {value}
              </div>
            </div>
          </div>
          :
          <div className="received-permission-container-declined">           
            <div className="received-permission-box">
              <div>
                <span style={{ fontSize: '20px', lineHeight: '20px', marginBottom: '10px' }}>{name}</span>
              </div>
              <div className="received-value">
                The user declined to send this information
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
