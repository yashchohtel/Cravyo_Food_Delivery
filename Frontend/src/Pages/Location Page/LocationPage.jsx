/* eslint-disable react-hooks/set-state-in-effect */
import './LocationPage.css'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import { FaArrowLeft } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi"; import { MdOutlineAddBox } from "react-icons/md";
import { recentSearches, savedAddresses } from '../../utils/dummyData';
import LocationCard from '../../Components/Ui/LocationCard/LocationCard';
import { useEffect, useState } from 'react';
import { getSearchLocations } from '../../utils/getLocation';

const LocationPage = () => {

    // useNavigate hook to navigate to previous page
    const navigate = useNavigate();

    /* SAVED ADDRESS MENU ↓ -------------------------------------- */

    // state to store the id of the editing saved address, to manage the open/close state of the dropdown menu for each address card
    const [openMenuId, setOpenMenuId] = useState(null);

    /* SEARCHING LOCATION ↓ -------------------------------------- */

    // state to store the search query entered by the user in the search bar
    const [searchQuery, setSearchQuery] = useState("");

    // state to track if the user is currently searching for a location
    const [isSearching, setIsSearching] = useState(false);

    // state to store the search results based on the user's query
    const [searchResults, setSearchResults] = useState([]);


    /* EFFECTS ↓ -------------------------------------- */

    useEffect(() => {

        // If the search query is empty, clear the search results and return early
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setIsSearching(true);
            const results = await getSearchLocations(searchQuery);
            console.log(results);
            setSearchResults(results);

            const locations = results.map((item) => ({
                id: item.place_id,
                title: item.name,
                address: item.formatted,
                latitude: item.lat,
                longitude: item.lon,
            }));

            setSearchResults(locations);

            setIsSearching(false);

        }, 300);

        return () => clearTimeout(timeout);

    }, [searchQuery]);

    return (

        <>

            {/* overlya */}
            {openMenuId && <div
                className="overlay"
                onClick={() => setOpenMenuId(null)}
            >
            </div>}

            {/* location page */}
            <div className="locationPage container">

                {/* location page header */}
                <div className="locationHeader">

                    <FaArrowLeft
                        className="backIcon"
                        onClick={() => navigate(-1)}
                    />

                    <h2>Select Your Location</h2>

                </div>

                {/* search bar */}
                <SearchBar
                    value={searchQuery} // pass the search query state as the value of the search bar input
                    onChange={(e) => setSearchQuery(e.target.value)} // update the search query state when the user types in the search bar
                />

                {/* locaiton actions */}
                <div className={`locationActions ${searchQuery.trim() ? "hide" : ""}`}>

                    <button className="locationAction">
                        <BiTargetLock />
                        <p>Use Current Location</p>
                    </button>

                    <button className="locationAction">
                        <MdOutlineAddBox />
                        <p>Add New Address</p>
                    </button>

                </div>

                {/* Location cards - saved adress */}
                {savedAddresses.length > 0 && (

                    <>

                        {/* saved adddress heading */}
                        <h3 className="sectionHeading">SAVED ADDRESSES</h3>

                        {savedAddresses.map((address) => (

                            // location card component for each saved address
                            <LocationCard
                                key={address.id}
                                data={address}
                                type="saved"
                                openMenuId={openMenuId}
                                setOpenMenuId={setOpenMenuId}
                            />

                        ))}

                    </>

                )}

                {/* Location cards - recent searches */}
                {recentSearches.length > 0 && (

                    <>
                        {/* Recent searches heading */}
                        <h3 className="sectionHeading">RECENT SEARCHES</h3>

                        {recentSearches.map((search) => (
                            <LocationCard
                                key={search.id}
                                data={search}
                                type="recent"
                            />
                        ))}

                    </>

                )}

            </div>

        </>

    )

}

export default LocationPage;