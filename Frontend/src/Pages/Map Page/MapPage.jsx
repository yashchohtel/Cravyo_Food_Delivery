/* eslint-disable no-unused-vars */
import './MapPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import Map from '../../Components/Ui/Map/Map';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useState } from 'react';

const MapPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    // initilize use location
    const location = useLocation();

    // get locaiton data from local storage
    const { userLocation } = useSelector((state) => state.location);

    // state to trigger map recenter action
    const [recenterMap, setRecenterMap] = useState(0);

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
                    <Map recenterMap={recenterMap} />
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

                    </div>

                </div>

            </div>

        </>

    )

}

export default MapPage;
















// // Save the selected location to recent searches
// const saveRecentSearch = () => {

//     // get recent searches data from local storage
//     const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

//     const updatedSearches = [
//         data,
//         ...recentSearches.filter((item) => item.id !== data.id)
//     ].slice(0, 5);

//     // save to local storage
//     localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

// };