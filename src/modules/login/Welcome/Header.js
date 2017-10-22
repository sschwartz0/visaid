import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Header extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const {
      image,
      text,
    } = this.props;
    return (
      <div className="header-container">
        {text}
        <div className="header-image" />
      </div>
    );
  }
}
