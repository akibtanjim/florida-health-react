import React from 'react';
import PropTypes from 'prop-types';

const File = ({ fileCount, onChange }) => {
  return [...Array(fileCount)].map((val, key) => (
    <div className="col col-3 mb-3" key={key}>
      <input type="file" onChange={onChange} className="form-control" />
    </div>
  ));
};

File.propTypes = {
  onChange: PropTypes.func,
  fileCount: PropTypes.number,
};

export default File;
