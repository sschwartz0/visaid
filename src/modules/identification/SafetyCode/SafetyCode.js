import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../components/InputText';

export default class SafetyCode extends PureComponent {
  static propTypes = {
    code: PropTypes.number,
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
    
    const isDisabled = status !== undefined && status !== 'SENDING';

    return (
      <InputText
        className="test"
        disabled={isDisabled}
        value={code || undefined}
        placeholder="Enter a code here or start requesting permissions"
        name="code"
        onChange={this.onFormChange}
      />
    );
  }
}
