// /* eslint-disable no-unused-vars */
import './MapPage.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import Map from '../../Components/Ui/Map/Map';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LocationDataSkeleton from '../../Components/Skeletons/Location Data Skeleton/LocationDataSkeleton';
import { setSelectedLocation } from '../../features/Location/locationSlice';

const MapPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    // initilize use dispatch
    const dispatch = useDispatch();

    // get locaiton data from local storage
    const { isMapLocationLoading } = useSelector((state) => state.location);

    // state to trigger map recenter action
    const [recenterMap, setRecenterMap] = useState(0);

    // state to store user selected locaion to show on display
    const [locationData, setLocationData] = useState({
        latitude: null,
        longitude: null,
        addressTitle: "",
        address: "",
    });

    // funciton to save searched location to local storge as recent search
    const saveRecentLocation = (locationData) => {

        // Get recent locations from localStorage
        const recentLocations = JSON.parse(localStorage.getItem("recentSearches")) || [];

        // Remove same location if it already exists
        const updatedLocations = [
            locationData,
            ...recentLocations.filter((item) => (
                item.latitude !== locationData.latitude ||
                item.longitude !== locationData.longitude
            ))
        ].slice(0, 5);

        // Save updated recent locations
        localStorage.setItem("recentSearches", JSON.stringify(updatedLocations));

    };

    // function to save user selected location
    const handleConfirmLocation = () => {
        
        // Save selected location to session storage
        sessionStorage.setItem("selectedLocation",JSON.stringify(locationData));

        // Update selected location in Redux
        dispatch(setSelectedLocation(locationData));

        // Save location to recent searches
        saveRecentLocation(locationData);

    };

    return (

        <>

            <div className="mapPage container">

                {/* location page header */}
                <div className="mapHeader">

                    <div
                        className="mapIconBack"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />

                    </div>

                    {/* search bar */}
                    <SearchBar />

                </div>

                {/* map */}
                <div className="mapContainer">
                    <Map
                        recenterMap={recenterMap}
                        setLocationData={setLocationData}
                    />
                </div>

                {/* button adress detail */}
                <div className="addressDetail">

                    {/* current locaiton button */}
                    <button
                        className='currentLocation'
                        onClick={() => setRecenterMap(prev => prev + 1)}
                    >
                        <span className="icon"> <FaLocationCrosshairs /> </span> Current location
                    </button>

                    {/* details */}
                    <div className="details">

                        {/* description */}
                        <div className="desc">

                            <div className="descText">
                                <span>Order will be delivered here</span>
                                <span>Place the pin at exact delivery location</span>
                            </div>

                        </div>

                        {/* locaiton data */}
                        <div className="locaitonDataContainer">

                            {isMapLocationLoading ?

                                <LocationDataSkeleton />

                                :

                                <div className="locationData">

                                    <div className="locationDataTitle">

                                        <div className="locationDataIcon">
                                            <FaLocationDot />
                                        </div>

                                        <h2>{locationData.addressTitle}</h2>

                                    </div>

                                    <p className="locationDataAddress">
                                        {locationData.address}
                                    </p>

                                    <button
                                        className="locationDataButton"
                                        onClick={handleConfirmLocation}
                                    >
                                        Confirm & proceed
                                    </button>

                                </div>

                            }

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}

export default MapPage;