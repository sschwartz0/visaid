import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string,
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
      className,
      value,
      disabled,
      name,
      placeholder,
    } = this.props;

    return (
      <div>
        <input
          type="text"
          className={className}
          disabled={disabled}
          name={name}
          onChange={this.onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}
