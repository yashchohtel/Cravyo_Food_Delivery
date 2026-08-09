import './MapPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';

const MapPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    // initilize use location
    const location = useLocation();

    /* -------------------------------------- */

    console.log(location.state?.location);
    console.log(location.state?.mode);

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