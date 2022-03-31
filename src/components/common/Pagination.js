import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ data, Component, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  return (
    <>
      {getPaginatedData().map((d, idx) => (
        <Component key={idx} item={d} />
      ))}
      {pages >= getPaginationGroup().length && (
        <tr className="text-right">
          <td colSpan="9">
            <div className="d-flex justify-content-end align-items-center">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {getPaginationGroup().map((item, index) => {
                    return (
                      <li
                        className={`page-item ${currentPage === item ? 'active' : null}`}
                        key={index}
                      >
                        <button onClick={changePage} className={`page-link `}>
                          <span>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                  <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={goToNextPage}
                      disabled={currentPage === pages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
Pagination.propTypes = {
  data: PropTypes.array,
  Component: PropTypes.any,
  pageLimit: PropTypes.number,
  dataLimit: PropTypes.number,
};
export default Pagination;
