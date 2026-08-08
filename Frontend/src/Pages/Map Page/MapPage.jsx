import { useLocation } from 'react-router-dom';
import './MapPage.css';

const MapPage = () => {

    // initilize use location
    const location = useLocation();

    console.log(location.state?.location);
    console.log(location.state?.mode);


    return (

        <>
            MapPage
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