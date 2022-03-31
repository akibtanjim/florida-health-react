import React from 'react';
import PropTypes from 'prop-types';

const Marker = ({ text }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: 60,
        height: 60,
        left: -60 / 2,
        top: -60 / 2,
        border: '5px solid white',
        borderRadius: 50,
        backgroundColor: 'black',
        textAlign: 'center',
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
        padding: 4,
      }}
    >
      <div style={{ marginTop: '10px' }}>{String(text).substring(0, 15)}</div>
    </div>
  );
};

Marker.propTypes = {
  text: PropTypes.string,
};
export default Marker;
