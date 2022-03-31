import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => {
  const { name = '-', city, address, state, zip, county, phone, type, capacity } = item;
  return (
    <tr className="text-center">
      <td scope="row">{name}</td>
      <td>{type}</td>
      <td>{address}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{county}</td>
      <td>{zip}</td>
      <td>{phone}</td>
      <td>{capacity}</td>
    </tr>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    slug: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    county: PropTypes.string,
    phone: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.number,
    images: PropTypes.array,
  }),
};

export default ListItem;
