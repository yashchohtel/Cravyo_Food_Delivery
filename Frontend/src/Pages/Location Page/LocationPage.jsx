/* eslint-disable react-hooks/set-state-in-effect */
import './LocationPage.css'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Ui/SearchBar/SearchBar';
import { FaArrowLeft } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi"; import { MdOutlineAddBox } from "react-icons/md";
import LocationCard from '../../Components/Ui/LocationCard/LocationCard';
import { useEffect, useState } from 'react';
import { getSearchLocations } from '../../utils/getLocation';
import NoResult from '../../Components/Ui/NoReuslt/NoResult';
import LocationCardSkeleton from '../../Components/Skeletons/Location Card Skeleton/LocationCardSkeleton';
import { savedAddresses } from '../../utils/dummyData';

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

    // state to track if the user has performed a search, used to conditionally render the "No Result" UI
    const [hasSearched, setHasSearched] = useState(false);

    // state to store the search results based on the user's query
    const [searchResults, setSearchResults] = useState([]);

    /* EFFECTS ↓ -------------------------------------- */

    // Search locations when query changes
    useEffect(() => {

        // Reset when query is empty
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        const timeout = setTimeout(async () => {

            setIsSearching(true);

            const results = await getSearchLocations(searchQuery);

            const locations = results.map((item) => ({

                // Unique identifier for the location
                id: item.place_id,

                // Display
                title: item.name,
                address: item.formatted,

                // Coordinates
                latitude: item.lat,
                longitude: item.lon,

                // Location Details
                city: item.city,
                state: item.state,
                country: item.country,
                postcode: item.postcode,

                // Metadata
                category: item.category,
                resultType: item.result_type,

                // Saved Address Fields (future)
                addressType: null,      // home | work | other
                selected: false,
            }));

            // Update the search results state with the fetched locations
            setSearchResults(locations);

            // Update the searching and searched states
            setIsSearching(false);
            setHasSearched(true);

            const matchedSavedAddresses = savedAddresses.filter((savedAddress) => (
                locations.some((location) => location.city === savedAddress.city)
            ));

            console.log(matchedSavedAddresses);

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

                {/* location card skeleton */}
                {isSearching && searchQuery.trim() && (

                    <div className="skeletonContainer">
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <LocationCardSkeleton key={index} />
                            ))
                        }
                    </div>

                )}

                {/* no result ui */}
                {!isSearching && hasSearched && searchQuery.trim() && searchResults.length === 0 && (
                    <NoResult />
                )}

                {/* Saved Addresses */}
                {!isSearching && savedAddresses.length > 0 && (

                    <>

                        <h3 className="sectionHeading">SAVED ADDRESSES</h3>

                        {savedAddresses.map((address) => (

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

                {/* show search result */}
                {!isSearching && hasSearched && searchQuery.trim() && searchResults.length > 0 && (

                    <>

                        <div className="sectionHeading">Search result</div>

                        {searchResults.map((location) => (
                            <LocationCard
                                key={location.id}
                                data={location}
                                type="search"
                            />
                        ))}

                    </>

                )}

            </div>

        </>

    )

}

export default LocationPage;