import React from 'react';
import PropTypes from 'prop-types';

const File = ({ fileCount, onChange, accept = undefined }) => {
  return [...Array(fileCount)].map((val, key) => (
    <div className="col col-3 mb-3" key={key}>
      <input type="file" onChange={onChange} className="form-control" accept={accept} />
    </div>
  ));
};

File.propTypes = {
  onChange: PropTypes.func,
  fileCount: PropTypes.number,
  accept: PropTypes.string,
};

export default File;
