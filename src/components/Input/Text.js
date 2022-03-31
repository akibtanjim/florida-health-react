import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ onChange, value, required = true, placeHolder, disabled = false }) => {
  return (
    <div className="mb-3">
      {/* <label className="form-label fs-5 fw-bold">{label}</label> */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </div>
  );
};

Text.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Text;
