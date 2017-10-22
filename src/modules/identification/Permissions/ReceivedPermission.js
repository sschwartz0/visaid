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

    if (name === "creditRating") {
      return (
        <div className="received-permission-container-fair">
          <div className="received-permission-box">
            <div>
              <span style={{ fontSize: '20px', lineHeight: '20px', marginBottom: '10px' }}>Credit Rating</span>
            </div>
            <div className="received-value fair-credit-score">
              The user has a fair credit score 500-700
            </div>
          </div>
        </div>
      )
    }
    if (name === "visaStanding") {
      return (
        <div className="received-permission-container-fair">
          <div className="received-permission-box">
            <div>
              <span style={{ fontSize: '20px', lineHeight: '20px', marginBottom: '10px' }}>Visa Standing</span>
            </div>
            <div className="received-value good-visa-standing">
              The user is in good Visa standing
            </div>
          </div>
        </div>
      )
    }
    if (name === "income") {
      return (
        <div className="received-permission-container-fair">
          <div className="received-permission-box">
            <div>
              <span style={{ fontSize: '20px', lineHeight: '20px', marginBottom: '10px' }}>Income Range</span>
            </div>
            <div className="received-value fair-credit-score">
              $100,000+
            </div>
          </div>
        </div>
      );
    }
    if (name !== 'income' && name !== 'visaStanding' && name !== 'creditRating') {
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
}
