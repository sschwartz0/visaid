import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../components/InputText';


export default class SafetyCode extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    formChange: PropTypes.func,
    isRequesting: PropTypes.bool,
  };

  onFormChange = field => {
    this.props.formChange(field);
  }

  render() {
    const {
      code,
      isRequesting,
    } = this.props;
    
    return (
      <InputText
        className="test"
        disabled={isRequesting}
        value={code || undefined}
        placeholder="Enter a code here or start requesting permissions"
        name="code"
        onChange={this.onFormChange}
      />
    );
  }
}
