import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
