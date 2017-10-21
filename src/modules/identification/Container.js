import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SafetyCode from './SafetyCode/SafetyCode';
import { formChange } from './actions';

const mapStateToProps = state => {
  const {
    identification: {
      code,
      isRequesting,
    },
  } = state;

  return {
    code,
    isRequesting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    formChange: (change) => { dispatch(formChange(change)); },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Identification extends PureComponent {
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
      formChange,
      isRequesting,
    } = this.props;

    return (
      <div>
        <SafetyCode
          code={code}
          formChange={formChange}
          isRequesting={isRequesting}
        />
      </div>
    );
  }
}
