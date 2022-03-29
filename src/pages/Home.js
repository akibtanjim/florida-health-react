import React from 'react';
import Text from '../components/Input/Text';
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement, addAmount } from '../redux/counterSlice';

const Home = () => {
  //   const [value, setValue] = useState(0);

  //   const { amount } = useSelector((state) => state.reducer);

  //   const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStateChange = (e) => {
    setState(e.target.value);
  };
  return (
    <>
      <div className="row">
        <div className="col col-md-6">
          <h2>Facilities</h2>
        </div>
        <div className="col col-md-6">
          <a
            href="{{ route('campaigns.create') }}"
            className="btn btn btn-primary rounded-4 float-end"
          >
            Create
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-4">
          <Text placeHolder="Name" onChange={onNameChange} value={name} required={true} />
        </div>
        <div className="col col-md-4">
          <Text placeHolder="City" onChange={onCityChange} value={city} />
        </div>
        <div className="col col-md-4">
          <Text placeHolder="State" onChange={onStateChange} value={state} />
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12" id="campaigns">
          <div className="table-responsive">
            <table className="table table-secondary table-bordered table-striped table-hover">
              <thead>
                <tr className="text-dark text-center">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">From Date</th>
                  <th scope="col">To Date</th>
                  <th scope="col">Total Budget</th>
                  <th scope="col">Daily Budget</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">
                    <p className="fs-6 fw-bold">No Campaigns Found</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
