import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="container">
        <Link className="navbar-brand letter-white" to="/">
          Florida Health Facilities
        </Link>
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
