import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../components/InputText';

export default class SafetyCode extends PureComponent {
  static propTypes = {
    code: PropTypes.any,
    formChange: PropTypes.func,
    status: PropTypes.string,
  };

  onFormChange = field => {
    this.props.formChange(field);
  };

  render() {
    const {
      code,
      status,
    } = this.props;

    const isDisabled = status === 'REQUESTING';

    return (
      <div className="safetycode-container">
        <InputText
          className="test"
          disabled={isDisabled}
          value={code || ''}
          placeholder="Enter your code here"
          name="code"
          onChange={this.onFormChange}
        />
      </div>
    );
  }
}
