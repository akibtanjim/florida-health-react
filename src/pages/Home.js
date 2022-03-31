import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import api from '../services/api';
import Text from '../components/Input/Text';
import File from '../components/Input/File';
import List from '../components/Home/List';

import { storeFacilities } from '../redux/facilitySlice';

const Home = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [state, setState] = useState(undefined);
  const [fileCount, setFileCount] = useState(1);
  const [images, setImages] = useState([]);
  const [showFileIinput, setShowFileIinput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);

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
  const encodeImageFileAsURL = (element) => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log('RESULT', reader.result);
    };
    return reader.readAsDataURL(file);
  };
  const onFileChange = (e) => {
    encodeImageFileAsURL(e.target);
    setImages([...images, e.target.files[0]]);
  };

  const onScapeButtonClick = () => {
    setShowFileIinput(true);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get('/facilities')
      .then((response) => {
        const data = response?.data?.data || [];
        dispatch(storeFacilities(data));
        setFacilities(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Something went wrong!',
        });
      });
    return () => {
      setShowFileIinput(false);
    };
  }, []);
  useEffect(() => {
    if (name || city || state) {
      setSearchButtonDisable(false);
    } else {
      setSearchButtonDisable(true);
    }
  }, [name, city, state]);

  const onSearchClick = () => {
    setLoading(true);
    api
      .post('/facilities/search', {
        name: name !== '' ? name : undefined,
        city: city !== '' ? city : undefined,
        state: state !== '' ? state : undefined,
      })
      .then((response) => {
        const data = response?.data?.data || [];
        dispatch(storeFacilities(data));
        setFacilities(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Something went wrong!',
        });
      });
  };

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
          <File fileCount={fileCount} onChange={onFileChange} accept="image/png, image/jpeg" />
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
          <button
            className="btn btn btn-primary rounded-4"
            disabled={searchButtonDisable}
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <List loading={loading} facilities={facilities || []} />
        </div>
      </div>
    </>
  );
};

export default Home;
