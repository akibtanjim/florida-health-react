import React, { useEffect } from 'react';
import Text from '../components/Input/Text';
import { useState } from 'react';
import File from '../components/Input/File';
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement, addAmount } from '../redux/counterSlice';

const Home = () => {
  //   const [value, setValue] = useState(0);

  //   const { amount } = useSelector((state) => state.reducer);

  //   const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [fileCount, setFileCount] = useState(1);
  const [images, setImages] = useState([]);
  const [showFileIinput, setShowFileIinput] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStateChange = (e) => {
    setState(e.target.value);
  };

  const addMoreFileInput = () => {
    setFileCount(fileCount + 1);
  };

  const onFileChange = (e) => {
    setImages([...images, e.target.files[0]]);
  };

  const onScapeButtonClick = () => {
    setShowFileIinput(true);
  };

  useEffect(() => {
    return () => {
      setShowFileIinput(false);
    };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col col-md-6">
          <h2>Search Facilities</h2>
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
      {showFileIinput && (
        <div className="row mb-3">
          <File fileCount={fileCount} onChange={onFileChange} />
          <div className="col col-md-12 mb-3">
            <button type="button" className="btn btn-sm btn-outline-dark float-end mb-10">
              Scapre & Save
            </button>
          </div>
          <div className="col col-md-12">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary float-end mb-10"
              onClick={addMoreFileInput}
            >
              Add More
            </button>
          </div>
        </div>
      )}

      <div className="row my-4">
        <div className="d-flex flex-row-reverse bd-highlight">
          <button className="btn btn btn-primary rounded-4 ms-4" onClick={onScapeButtonClick}>
            Scrape
          </button>
          <button className="btn btn btn-primary rounded-4">Search</button>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <div className="table-responsive">
            <table className="table table-light table-bordered table-striped table-hover">
              <thead>
                <tr className="text-dark text-center">
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Zip</th>
                  <th scope="col">County</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Type</th>
                  <th scope="col">Capacity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center">
                    <p className="fs-6 fw-bold">No Facilities Found</p>
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
