import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonNotif from './ButtonNotif';

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

    const style = 'mdl-textfield__input inputText inputTextStyle inputTextStyle inputTextStyle::placeholder';

    return (
      <div
        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
        data-upgraded=",MaterialTextfield"
      >
        {disabled && 
          <ButtonNotif 
            text={value}
          />
        }

        {!disabled && <input
          type="text"
          className={style}
          disabled={disabled}
          name={name}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
        />}

        {/* <input
          type="text"
          className="mdl-textfield__input inputText inputTextStyle inputTextStyle inputTextStyle::placeholder"
          disabled={disabled}
          name={name}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
        /> */}
      </div>
    );
  }
}
