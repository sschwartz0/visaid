import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends PureComponent {
  static propTypes = {
    // className: PropTypes.string.isRequired,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  onChange = (e) => {
    const text = e.target.value;
    const {
      onChange,
      name,
    } = this.props;
    const transformedText = text === '' ? null : text;

    onChange({
      name,
      value: transformedText,
    });
  };

  render() {
    const {
      // className,
      value,
      disabled,
      name,
      placeholder,
    } = this.props;

    return (
      <div
        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
        data-upgraded=",MaterialTextfield"
      >
        <input
          type="text"
          className="mdl-textfield__input inputText inputTextStyle"
          disabled={disabled}
          name={name}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
