import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectFacility } from '../../redux/facilitySlice';

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const {
    name = '-',
    city,
    address,
    state,
    zip,
    county = '-',
    phone,
    type,
    capacity,
    slug = '',
  } = item;

  const onDetailsClick = () => {
    dispatch(selectFacility(item));
  };

  return (
    <tr className="text-center">
      <td scope="row">
        <Link to={`/facilities/${slug}`} onClick={onDetailsClick}>
          {name}
        </Link>
      </td>
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
