import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import api from '../services/api';
import Text from '../components/Input/Text';
import File from '../components/Input/File';
import List from '../components/Home/List';

import { selectFacility, storeFacilities } from '../redux/facilitySlice';

const Home = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [fileCount, setFileCount] = useState(1);
  const [images, setImages] = useState([]);
  const [showFileIinput, setShowFileIinput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [disableInput, setDisableInput] = useState(false);

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
  const encodeImageFileAsBase64 = (element) => {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setImages([...images, reader.result]);
    };
    return reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    encodeImageFileAsBase64(e.target);
  };

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

  const onScapeButtonClick = () => {
    setDisableInput(true);
    setShowFileIinput(true);
  };

  const onScrapAndSaveClick = () => {
    setLoading(true);
    api
      .post('/facilities/search', {
        name: name !== '' ? name : undefined,
        city: city !== '' ? city : undefined,
        state: state !== '' ? state : undefined,
        storeData: true,
        images: images?.length ? images : undefined,
      })
      .then((response) => {
        const data = response?.data?.data || [];
        dispatch(storeFacilities(data));
        setShowFileIinput(false);
        setFileCount(1);
        setDisableInput(false);
        setFacilities(data);
        setLoading(false);
      })
      .catch((error) => {
        setDisableInput(false);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Something went wrong!',
        });
      });
  };

  useEffect(() => {
    dispatch(selectFacility({}));
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

  return (
    <>
      <div className="row">
        <div className="col col-md-6">
          <h2>Search Facilities</h2>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-4">
          <Text
            placeHolder="Name"
            onChange={onNameChange}
            value={name}
            required={true}
            disabled={disableInput}
          />
        </div>
        <div className="col col-md-4">
          <Text placeHolder="City" onChange={onCityChange} value={city} disabled={disableInput} />
        </div>
        <div className="col col-md-4">
          <Text
            placeHolder="State"
            onChange={onStateChange}
            value={state}
            disabled={disableInput}
          />
        </div>
      </div>
      {showFileIinput && (
        <div className="row mb-3">
          <File fileCount={fileCount} onChange={onFileChange} accept="image/png, image/jpeg" />
          <div className="col col-md-12 mb-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary float-end mb-10"
              onClick={addMoreFileInput}
              disabled={loading}
            >
              Add More Image
            </button>
          </div>
          <div className="col col-md-12 mb-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-dark float-end mb-10"
              onClick={onScrapAndSaveClick}
              disabled={loading}
            >
              Scapre & Save
            </button>
          </div>
        </div>
      )}
      {!disableInput && (
        <div className="row my-4">
          <div className="d-flex flex-row-reverse bd-highlight">
            <button
              className="btn btn btn-primary rounded-4 ms-4"
              disabled={searchButtonDisable || loading}
              onClick={onScapeButtonClick}
            >
              Scrape
            </button>
            <button
              className="btn btn btn-primary rounded-4"
              disabled={searchButtonDisable || loading}
              onClick={onSearchClick}
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col col-md-12">
          <List loading={loading} facilities={facilities || []} />
        </div>
      </div>
    </>
  );
};

export default Home;
