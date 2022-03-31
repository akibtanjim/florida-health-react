import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Geocode from 'react-geocode';
import Swal from 'sweetalert2';
import GoogleMapReact from 'google-map-react';

import { selectFacility } from '../redux/facilitySlice';
import api from '../services/api';
import { googleApiKey } from '../config';
import Marker from '../components/Details/Marker';

const Details = () => {
  const dispatch = useDispatch();
  const { selectedFacility = {} } = useSelector((state) => state.facility);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [lattiude, setLattiude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [notFound, setNotfound] = useState(false);

  const onPrevClick = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };
  const onNextClick = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };
  useEffect(() => {
    Geocode.setApiKey(googleApiKey);
    if (Object.keys(selectedFacility).length === 0) {
      api
        .get(`/facilities/${slug}`)
        .then((response) => {
          dispatch(selectFacility(response?.data?.data || {}));
        })
        .catch((error) => {
          setLoading(false);
          console.log(error?.response);
          if (error?.response?.status === 404) {
            setNotfound(true);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error?.response?.data?.message || 'Something went wrong!',
            });
          }
        });
    } else {
      selectedFacility?.slug !== slug ? setNotfound(true) : setNotfound(false);
    }
  }, []);
  useEffect(() => {
    if (Object.keys(selectedFacility).length > 0) {
      Geocode.fromAddress(selectedFacility.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLattiude(lat);
          setLongitude(lng);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    }
  }, [selectedFacility]);
  return (
    <div className="container">
      <div className={`row justify-content-center ${loading && 'align-items-center full-height'} `}>
        {loading ? (
          <div className="spinner-border text-black" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          Object.keys(selectedFacility).length > 0 &&
          !notFound && (
            <div className="container">
              <div className="row justify-content-center h-100">
                {lattiude && longitude && (
                  <div className="col col-md-12 w-100 h-75 mb-3">
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: googleApiKey }}
                      defaultCenter={{
                        lat: lattiude,
                        lng: longitude,
                      }}
                      defaultZoom={16}
                    >
                      <Marker text={selectedFacility?.name || ''} />
                    </GoogleMapReact>
                  </div>
                )}
                <div className="col col-md-6 col-sm-12 ">
                  <p className="mt-10">
                    <span className="fw-bold">Name:</span> {selectedFacility?.name || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">Type:</span> {selectedFacility?.type || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">Address:</span> {selectedFacility?.address || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">City:</span> {selectedFacility?.city || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">State:</span> {selectedFacility?.state || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">County:</span> {selectedFacility?.county || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">Zip:</span> {selectedFacility?.zip || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">Phone:</span> {selectedFacility?.phone || '-'}
                  </p>
                  <p>
                    <span className="fw-bold">Capacity:</span> {selectedFacility.capacity}
                  </p>
                </div>
                <div className="col col-md-6">
                  <div className="row justify-content-center" style={{ height: '310px' }}>
                    {selectedFacility?.images?.length > 0 && (
                      <>
                        <img
                          src={selectedFacility?.images[currentImageIndex]?.location}
                          className="h-100 mb-3"
                          alt={selectedFacility?.name}
                        />
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: '40px' }}
                        >
                          <button
                            className={`page-link`}
                            onClick={onPrevClick}
                            disabled={currentImageIndex === 0}
                          >
                            Previous
                          </button>
                          <button
                            className={`page-link`}
                            onClick={onNextClick}
                            disabled={currentImageIndex === selectedFacility.images.length - 1}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        {!loading && notFound && <p className="fs-4 fw-bold text-center">Resource Not Found</p>}
      </div>
    </div>
  );
};

export default Details;
