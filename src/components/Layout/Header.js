import React from 'react';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="container">
        <a className="navbar-brand letter-white">Florida Health Facilities</a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
