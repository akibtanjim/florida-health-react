import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../common/Pagination';
import ListItem from './ListItem';

const List = ({ loading, facilities }) => {
  return (
    <div className="table-responsive">
      <table className="table table-light table-bordered table-striped table-hover">
        <thead>
          <tr className="text-dark text-center">
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">County</th>
            <th scope="col">Zip</th>
            <th scope="col">Phone</th>
            <th scope="col">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {!loading && facilities?.length > 0 && (
            <Pagination data={facilities} Component={ListItem} pageLimit={5} dataLimit={10} />
          )}
          {loading && (
            <tr>
              <td colSpan="9" className="text-center">
                <div className="spinner-border text-black" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
          {!loading && facilities.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center">
                <p className="fs-6 fw-bold">No Facilities Found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
List.propTypes = {
  facilities: PropTypes.array,
  loading: PropTypes.bool,
  pageLimit: PropTypes.number,
  dataLimit: PropTypes.number,
};
export default List;
