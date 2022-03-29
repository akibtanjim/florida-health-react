import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col-md-12">
          <p className="fs-6 fw-bold float-end">
            Copyright &copy; {new Date().toISOString().slice(0, 4)}{' '}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
